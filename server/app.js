var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();
var bcrypt = require('bcryptjs');

const uri =
  "mongodb+srv://Admin:DataStructures@cluster0-wcree.mongodb.net/TutorBase?retryWrites=true&w=majority";
mongoose.connect(uri,  { useUnifiedTopology: true, useNewUrlParser: true  });


//Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter)
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

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
