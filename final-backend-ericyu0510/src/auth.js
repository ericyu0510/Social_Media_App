const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const mongoose = require("mongoose");
const schema = require("./schema");
const User = mongoose.model("user", schema.userSchema);
const Profile = mongoose.model("profile", schema.profileSchema);
const connectionString =
  "mongodb+srv://my52:my52@cluster0.fprwnuu.mongodb.net/?retryWrites=true&w=majority";

// this is in auth.js
const sessionUser = {};

const cookieKey = "sid";
const mySecretMessage = "mysecretmessage";

const defaultHeadline = "This is the default headline.";

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.sendStatus(400).send("Missing username or password.");
    return;
  }

  mongoose.connect(connectionString, {
    dbName: "COMP531_backend",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  User.findOne({ username: username }, async function (err, user) {
    if (err) {
      // error in querying MongoDB
      console.log(err);
    } else {
      // no such username found
      if (!user || user.length == 0) {
        res.status(401).send("Username does not exist.");
        return;
      }

      //check hashed password stored in DB matches or not
      const dbUsername = user.username;
      const salt = user.salt;
      const dbHash = user.hash;
      let calcHash = await bcrypt.hash(password, salt);

      // username or password does not match
      if (username !== dbUsername || dbHash !== calcHash) {
        res.status(403).send("Either username or password is wrong.");
        return;
      }
      // username and password matches, create a session for the user
      const sessionKey = md5(mySecretMessage + new Date().getTime() + username);
      sessionUser[sessionKey] = username;
      // this sets a cookie
      res.cookie(cookieKey, sessionKey, {
        maxAge: 3600 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.send({ username: username, result: "success" });
    }
  });
};

function isLoggedIn(req, res, next) {
  // likely didn't install cookie parser
  if (!req.cookies) {
    return res.sendStatus(401);
  }
  let sid = req.cookies[cookieKey];

  // no sid for cookie key
  if (!sid) {
    return res.sendStatus(401);
  }
  let username = sessionUser[sid];

  // no username mapped to sid
  if (username) {
    req.username = username;
    next();
  } else {
    return res.sendStatus(401);
  }
}

const handleLogout = (req, res) => {
  delete sessionUser[req.cookies[cookieKey]];
  res.clearCookie(cookieKey);
  res.send("OK");
};

const handleRegister = async (req, res) => {
  const { username, email, dob, zipcode, password } = req.body;
  if (!username || !password) {
    res.sendStatus(400).send("Missing username or password");
    return;
  }
  mongoose.connect(connectionString, {
    dbName: "COMP531_backend",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const query = await User.find({ username: username });
  if (query.length != 0) {
    res.status(409).send("Username is used.");
    return;
  }

  const salt_res = bcrypt.genSaltSync(saltRounds);
  const hash_res = bcrypt.hashSync(password, salt_res);

  const newUser = new User({
    username: username,
    auth: ["pass"],
    salt: salt_res,
    hash: hash_res,
  });
  await newUser.save();

  const newProfile = new Profile({
    username: username,
    headline: defaultHeadline,
    following: [],
    email: email,
    dob: dob,
    zipcode: zipcode,
    avatar: "",
  });

  await newProfile.save();

  // generate cookie for new registered user
  const sessionKey = md5(mySecretMessage + new Date().getTime() + username);
  sessionUser[sessionKey] = username;
  // this sets a cookie
  res.cookie(cookieKey, sessionKey, {
    maxAge: 3600 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.send({ result: "success", username: username });
};

const setPassword = async (req, res) => {
  const newPassword = req.body.password;
  const username = sessionUser[req.cookies[cookieKey]];

  const salt_res = bcrypt.genSaltSync(saltRounds);
  const hash_res = bcrypt.hashSync(newPassword, salt_res);

  await mongoose.connect(connectionString, {
    dbName: "COMP531_backend",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const filter = { username: username };
  const update = { salt: salt_res, hash: hash_res };
  await User.findOneAndUpdate(filter, update);
  res.send({ username: username, result: "success" });
};

module.exports = (app) => {
  app.post("/login", handleLogin);
  app.post("/register", handleRegister);
  app.use(isLoggedIn);
  app.put("/logout", handleLogout);
  app.put("/password", setPassword);
};
