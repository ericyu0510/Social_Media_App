const fileUpload = require("./fileUpload");
const mongoose = require("mongoose");
const schema = require("./schema");
const Profile = mongoose.model("profile", schema.profileSchema);
const connectionString =
  "mongodb+srv://my52:my52@cluster0.fprwnuu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  dbName: "COMP531_backend",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const defaultProfile = {
  username: "testUser",
  headline: "my52 is struggling in HW6",
  email: "my52@rice.edu",
  zipcode: 77005,
  dob: "1999-01-01",
  avatar: "my52.png",
};

const getHeadline = async (req, res) => {
  const { user } = req.params;
  if (!user) {
    res.status(400).send("Please include username");
  } else {
    const profileObj = await Profile.findOne({ username: user });
    if (!profileObj) {
      res.status(400).send("User not found");
    } else {
      res.status(200).send({ username: user, headline: profileObj.headline });
    }
  }
};

const setHeadline = async (req, res) => {
  const loggedInUser = req.username;
  const newHeadline = req.body.headline;
  if (!newHeadline) {
    res.status(400).send("Please send headline you want to update");
    return;
  }
  const profileObj = await Profile.findOne({ username: loggedInUser });
  profileObj.headline = newHeadline;
  await profileObj.save();
  res.status(200).send({ username: loggedInUser, headline: newHeadline });
};

const getEmail = async (req, res) => {
  const { user } = req.params;
  if (!user) {
    res.status(400).send("Please include username");
  } else {
    const profileObj = await Profile.findOne({ username: user });
    if (!profileObj) {
      res.status(400).send("User not found");
    } else {
      res.status(200).send({ username: user, email: profileObj.email });
    }
  }
};

const setEmail = async (req, res) => {
  const loggedInUser = req.username;
  const newEmail = req.body.email;
  if (!newEmail) {
    res.status(400).send("Please include email you want to update");
    return;
  }

  const profileObj = await Profile.findOne({ username: loggedInUser });
  profileObj.email = newEmail;
  await profileObj.save();
  res.status(200).send({ username: loggedInUser, email: newEmail });
};

const getDob = async (req, res) => {
  const { user } = req.params;
  if (!user) {
    res.status(400).send("Please include username");
  } else {
    const profileObj = await Profile.findOne({ username: user });
    if (!profileObj) {
      res.status(400).send("User not found");
    } else {
      res.status(200).send({ username: user, dob: profileObj.dob });
    }
  }
};

const getZipcode = async (req, res) => {
  const { user } = req.params;
  if (!user) {
    res.status(400).send("Please include username");
  } else {
    const profileObj = await Profile.findOne({ username: user });
    if (!profileObj) {
      res.status(400).send("User not found");
    } else {
      res.status(200).send({ username: user, zipcode: profileObj.zipcode });
    }
  }
};

const setZipcode = async (req, res) => {
  const loggedInUser = req.username;
  const newZipcode = req.body.zipcode;
  if (!newZipcode) {
    res.status(400).send("Please include zipcode you want to update");
    return;
  }
  const profileObj = await Profile.findOne({ username: loggedInUser });
  profileObj.zipcode = newZipcode;
  await profileObj.save();
  res.status(200).send({ username: loggedInUser, zipcode: newZipcode });
};

const getAvatar = async (req, res) => {
  const { user } = req.params;
  if (!user) {
    res.status(400).send("Please include username");
  } else {
    const profileObj = await Profile.findOne({ username: user });
    if (!profileObj) {
      res.status(400).send("User not found");
    } else {
      res.status(200).send({ username: user, avatar: profileObj.avatar });
    }
  }
};

const setAvatar = async (req, res) => {
  // console.log(req.fileurl);
  const loggedInUser = req.username;
  const newAvatarUrl = req.fileurl;

  // change newAvatarUrl from http to https to avoid warming
  const newAvatarUrlHttps = "https" + newAvatarUrl.substring(4);

  if (!newAvatarUrlHttps) {
    res.status(400).send("Please include cloudinary url you want to update");
    return;
  }
  const profileObj = await Profile.findOne({ username: loggedInUser });
  profileObj.avatar = newAvatarUrlHttps;
  await profileObj.save();
  res.status(200).send({ username: loggedInUser, avatar: newAvatarUrlHttps });
};

module.exports = (app) => {
  app.get("/headline/:user?", getHeadline);
  app.put("/headline", setHeadline);
  app.get("/email/:user?", getEmail);
  app.put("/email", setEmail);
  app.get("/dob/:user?", getDob);
  app.get("/zipcode/:user?", getZipcode);
  app.put("/zipcode", setZipcode);
  app.get("/avatar/:user?", getAvatar);
  app.put("/avatar", fileUpload.uploadImage("publicId"), setAvatar);
};
