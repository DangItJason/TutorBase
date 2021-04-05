const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bcrypt = require('bcryptjs');
const fs = require("fs");

// Middleware
const isLoggedIn = require('./middleware/authentication');

// Authentication Packages
const cas = require("./config/casStrategy");
const session = require("express-session");
const passport = require("passport");

// Connect to database
const uri =
    "mongodb+srv://Admin:DataStructures@cluster0-wcree.mongodb.net/TutorBase?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/users");
const loginRouter = require("./routes/api/login");
const catalogRouter = require("./routes/api/catalog");
const coursesRouter = require("./routes/api/courses");
const subjectsRouter = require("./routes/api/subjects");
const emailClientRouter = require("./routes/api/email-user");
const tutorsRouter = require("./routes/api/tutors");
const appointmentsRouter = require("./routes/api/appointment");

// Allowing Cors Usage
app.use(cors());

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Authentication Middleware
passport.use(cas);

app.use(session({
    secret: 'djskfjalkjsadlkf',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(err, user);
});


// Route REST URL's are set up
app.use("/api", indexRouter)
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/subjects", subjectsRouter);
app.use("/api/login", loginRouter);
app.use("/api/catalog", catalogRouter);
app.use("/api/email-user", emailClientRouter);
app.use("/api/tutors", tutorsRouter);
app.use("/api/appointment", appointmentsRouter);
app.get('/api/checkLogin', isLoggedIn, function (req, res) {
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

const User = require('./models/User');

//Goes through all documents of users and looks for any upcoming meetings that are older than the current time and moves to completed
//NOTE: THIS FUNCTION DOES NOT WORK WHEN DB DOES NOT FOLLOW MODELS
//Commented out for now until db follows model
/*async function updateDB() {
  let date = new Date();
  var count = 0;
  for await (var document of User.find()) {
    for(var i = 0; i < document.client.upcoming.length; i++){
      if(document.client.upcoming[i].date < date){
        User.updateOne({'_id': document._id, 'client.upcoming': {$elemMatch: document.client.upcoming[i]}}, {$addToSet: { 'client.completed': toAdd },  $pull: { 'client.upcoming': document.client.upcoming[i] }  });
        count++;
      }
    }
  }
  console.log('Moved ' + count + ' appointments to completed');
}*/

//Cronjob to call updateDB every 15 min
//var CronJob = require('cron').CronJob;
//var job = new CronJob('*/15 * * * *', function() {
//  updateDB();
//}, null, true, 'America/New_York');
//job.start();

module.exports = app;

