const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const mongoose = require("mongoose");
const schema = require("./schema");
const User = mongoose.model("user", schema.userSchema);
const Profile = mongoose.model("profile", schema.profileSchema);
const connectionString =
  "mongodb+srv://my52:my52@cluster0.fprwnuu.mongodb.net/?retryWrites=true&w=majority";

// const FRONTEND_URL = "http://localhost:3001";
const FRONT_URL = "https://ridefishfinal.surge.sh";
// const BACKEND_URL = "http://localhost:3000";
const BACKEND_URL = "https://ridefishfinal.herokuapp.com";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "283708280920-vtmvpnapri6ketdf4flcgdb50inhbfoa.apps.googleusercontent.com",
      // clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: "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",
      callbackURL: BACKEND_URL + "/auth/google/callback",
    },
    async function (req, accessToken, refreshToken, profile, done) {
      let user = {
        email: profile.emails[0].value,
        username: profile.name.givenName + " " + profile.name.familyName,
        // id: profile.id,
        avatar: profile.photos[0].value,
        token: accessToken,
      };
      req.user = user;
      // You can perform any necessary actions with your user at this point,
      // e.g. internal verification against a users table,
      // creating new user entries, etc.

      // mongoose.connect(connectionString, {
      //   dbName: "COMP531_backend",
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // });

      // const query = await User.find({ username: user.username });
      // if (query.length != 0) {
      //   //log in
      // } else {
      //   // register
      //   const newUser = new User({
      //     username: user.username,
      //     auth: ["google"],
      //   });
      //   await newUser.save();

      //   const newProfile = new Profile({
      //     username: user.username,
      //     headline: "This is the default headline.",
      //     following: [],
      //     email: user.email,
      //     dob: "1999-05-10",
      //     zipcode: "12345",
      //     avatar: user.avatar,
      //   });

      //   await newProfile.save();
      //   return done(null, user);
      // }

      return done(null, profile);
      // User.findOrCreate(..., function(err, user) {
      //     if (err) { return done(err); }
      //     done(null, user);
      // });
    }
  )
);

// Google will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

const callback = (req, res) => {
  console.log(req.user);

  // const cookieKey = "sid";
  // const mySecretMessage = "mysecretmessage";
  // // generate cookie for new registered user
  // const sessionKey = md5(mySecretMessage + new Date().getTime() + username);
  // sessionUser[sessionKey] = username;
  // // this sets a cookie
  // res.cookie(cookieKey, sessionKey, {
  //   maxAge: 3600 * 1000,
  //   httpOnly: true,
  //   sameSite: "None",
  //   secure: true,
  // });
  // res.send({ result: "success", username: username });

  passport.authenticate("google", {
    successRedirect: FRONT_URL,
    failureRedirect: FRONT_URL,
  })(req, res);
};

const successfulReddirct = (req, res) => {
  // redirect
  console.log("12345");
};

module.exports = (app) => {
  // Redirect the user to Google for authentication.  When complete,
  // Google will redirect the user back to the application at
  //     /auth/google/callback
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login", "email", "profile"],
    })
  ); // could have a passport auth second arg {scope: 'email'}

  app.get("/auth/google/callback", callback);
};
