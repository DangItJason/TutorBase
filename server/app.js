var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();
var bcrypt = require('bcryptjs');
var fs = require("fs");

//Middleware
var isLoggedIn = require('./middleware/authentication');

//Authentication Packages
var cas = require("./config/casStrategy")
var session = require("express-session");
var passport = require("passport");

const uri =
  "mongodb+srv://Admin:DataStructures@cluster0-wcree.mongodb.net/TutorBase?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

//Not so secret token key
const token_secret = "elonmuskismydaddy";

//Routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var catalogRouter = require("./routes/api/catalog");
var emailClientRouter = require("./routes/email-user");
var tutorOperations = require("./routes/tutor-operations")

//Allowing Cors Usage
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Authentication Middleware
passport.use(cas);

app.use(session({
  secret: 'djskfjalkjsadlkf',
  resave: false,
  saveUninitialized: false
}));
// passport.use(cas);
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


// Route REST URL's are set up
app.use("/", indexRouter)
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/catalog", catalogRouter);
app.use("/email-user", emailClientRouter);
app.use("/tutor-operations", tutorOperations);
app.get('/checkLogin', isLoggedIn, function (req, res) {
  res.sendStatus(200);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

