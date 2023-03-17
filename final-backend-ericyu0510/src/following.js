const mongoose = require("mongoose");
const schema = require("./schema");
const User = mongoose.model("user", schema.userSchema);
const Profile = mongoose.model("profile", schema.profileSchema);
const connectionString =
  "mongodb+srv://my52:my52@cluster0.fprwnuu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  dbName: "COMP531_backend",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getFollowing = async (req, res) => {
  const loggedInUser = req.username;
  const { user } = req.params;
  // if no user params provided, return the information for the current logged in user
  if (!user) {
    const userObj = await Profile.findOne({ username: loggedInUser });
    if (!userObj || userObj.length == 0) {
      // something must be wrong, loggedInUser is not in database
      res.status(401).send("Username does not exist.");
      return;
    }
    // loggedInUser found, we need to get the following array
    const following = userObj.following;
    res.status(200).send({ username: loggedInUser, following: following });
    return;
  } else {
    const userObj = await Profile.findOne({ username: user });
    if (!userObj || userObj.length == 0) {
      res.status(401).send("Username does not exist.");
      return;
    }
    // user found, we need to get the following array
    const following = userObj.following;
    res.status(200).send({ username: user, following: following });
  }
};

const addFollowing = async (req, res) => {
  const loggedInUser = req.username;
  const { user } = req.params;
  if (!user) {
    res.status(400).send("Please include user you want to follow");
    return;
  }
  // check if the user you want to follow exist or not
  const userObj = await User.findOne({ username: user });
  if (!userObj || userObj.length == 0) {
    res.status(401).send("Username does not exist.");
    return;
  }
  //update following list
  const loggedInUserObj = await Profile.findOne({ username: loggedInUser });
  if (!loggedInUserObj || loggedInUserObj.length == 0) {
    // something must be wrong, loggedInUser is not in database
    res.status(401).send("Username does not exist.");
    return;
  }
  const following = loggedInUserObj.following;
  if (following.includes(user)) {
    // Cannot add a user you've already followed
    res.status(401).send("Cannot add a user you've already followed.");
  } else {
    loggedInUserObj.following.push(user);
    await loggedInUserObj.save();
    res.send({ username: loggedInUser, following: loggedInUserObj.following });
  }
};

const deleteFollowing = async (req, res) => {
  const loggedInUser = req.username;
  const { user } = req.params;
  if (!user) {
    res.status(400).send("Please include user you want to follow");
    return;
  }
  // check if the user you want to follow exist or not
  const userObj = await User.findOne({ username: user });
  if (!userObj || userObj.length == 0) {
    res.status(401).send("Username does not exist.");
    return;
  }
  //update following list
  const loggedInUserObj = await Profile.findOne({ username: loggedInUser });
  if (!loggedInUserObj || loggedInUserObj.length == 0) {
    // something must be wrong, loggedInUser is not in database
    res.status(401).send("Username does not exist.");
    return;
  }
  const following = loggedInUserObj.following;
  if (!following.includes(user)) {
    // Cannot delete a user you do not follow
    res.status(401).send("Cannot delete a user you do not follow.");
  } else {
    // Delete the user from the following list
    loggedInUserObj.following.pull(user);
    await loggedInUserObj.save();
    res.send({ username: loggedInUser, following: loggedInUserObj.following });
  }
};

module.exports = (app) => {
  app.get("/following/:user?", getFollowing);
  app.put("/following/:user", addFollowing);
  app.delete("/following/:user", deleteFollowing);
};
