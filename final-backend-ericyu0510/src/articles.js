const fileUpload = require("./fileUpload");
const mongoose = require("mongoose");
const schema = require("./schema");
const User = mongoose.model("user", schema.userSchema);
const Profile = mongoose.model("profile", schema.profileSchema);
const Article = mongoose.model("article", schema.articleSchema);
const connectionString =
  "mongodb+srv://my52:my52@cluster0.fprwnuu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  dbName: "COMP531_backend",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getArticles = async (req, res) => {
  const loggedInUser = req.username;
  const id = req.params.id;
  if (id) {
    if (isNaN(id)) {
      const articles = await Article.find({ author: id });
      res.send({ articles: articles });
      return;
    } else {
      const articles = await Article.find({ pid: id });
      res.send({ articles: articles });
      return;
    }
  } else {
    const loggedInUserObj = await Profile.findOne({ username: loggedInUser });
    const articles = await Article.find({
      author: { $in: [...loggedInUserObj.following, loggedInUser] },
    });
    res.send({ articles: articles });
    return;
  }
};

const updateArticles = async (req, res) => {
  const loggedInUser = req.username;
  const pid = req.params.id;
  const newText = req.body.text;
  const commentId = req.body.commentId;
  const article = await Article.findOne({ pid: pid });

  if (!article) {
    res.status(400).send("Post ID not found.");
    return;
  } else if (article.author !== loggedInUser) {
    res.status(400).send("Do not own the post.");
    return;
  } else if (!newText) {
    // no text
    res.status(400).send("Please include article text you want to post");
    return;
  }

  if (commentId == -1) {
    article.comments.push({ commentId: Date.now(), comment: newText });
    await article.save();
    res.send({ articles: [article] });
    return;
  } else {
    article.text = newText;
    await article.save();
    res.send({ articles: [article] });
    return;
  }
};

const postArticle = async (req, res) => {
  const loggedInUser = req.username;
  const title = req.body.title;
  const text = req.body.text;
  if (!title || !text) {
    // no text
    res
      .status(400)
      .send("Please include article title and text you want to post");
    return;
  }

  const newArticle = new Article({
    pid: Date.now(),
    author: loggedInUser,
    title: title,
    text: text,
    date: Date.now(),
    comments: [],
  });
  await newArticle.save();
  res.send({ articles: [newArticle] });
};

const postArticleImg = async (req, res) => {
  if (!req.body.text) {
    // no text
    res
      .status(400)
      .send("Please include article title and text you want to post");
    return;
  }
  const loggedInUser = req.username;
  const title = req.body.text[0];
  const text = req.body.text[1];
  const cloudinaryUrl = req.fileurl;
  // change cloudinaryUrl from http to https to avoid warming
  const cloudinaryUrlHttps = "https" + cloudinaryUrl.substring(4);

  const newArticle = new Article({
    pid: Date.now(),
    author: loggedInUser,
    title: title,
    text: text,
    date: Date.now(),
    comments: [],
    img: cloudinaryUrlHttps,
  });
  await newArticle.save();
  res.send({ articles: [newArticle] });
};

module.exports = (app) => {
  app.get("/articles/:id?", getArticles);
  app.put("/articles/:id", updateArticles);
  app.post("/article", postArticle);
  app.post("/articleImg", fileUpload.uploadImage("publicId"), postArticleImg);
};
