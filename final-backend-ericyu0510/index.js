const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const md5 = require("md5");
const passport = require("passport");
const session = require("express-session");
const auth = require("./src/auth");
const articles = require("./src/articles");
const following = require("./src/following");
const profile = require("./src/profile");
const oauth = require("./src/oauth");

// const FRONTEND_URL = "http://localhost:3001";
const FRONTEND_URL = "https://ridefishfinal.surge.sh";

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(
  session({
    secret: "doNotGuessTheSecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

oauth(app);
auth(app);
articles(app);
following(app);
profile(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  const addr = server.address();
  console.log(`Server listening at http://${addr.address}:${addr.port}`);
});
