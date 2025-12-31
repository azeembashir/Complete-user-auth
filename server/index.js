//importing required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./utils/connection");
const googleAuth = require("./middlewares/googleAuth");
const userRouter = require("./routes/userRoutes");
const googleStrategy = require("passport-google-oauth20").Strategy;


// Middleware setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());

//google login configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5050/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  googleAuth,       //calling middleware
  (req, res, next) => {
    res.redirect("http://localhost:3000/");
  }
);

//routes 
app.use('/user', userRouter)


connectDB();
//app listening port
const port = process.env.PORT || 6060;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
