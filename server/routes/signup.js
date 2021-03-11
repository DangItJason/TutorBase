var express = require("express");
var router = express.Router();
var User = require("../models.js");
var bcryptjs = require("bcryptjs");
var emailsender = require("../lib/emailsender.js");
var textsender = require("../lib/textsender.js");
var fs = require("fs");

function signupNotify(name, email, phoneNumber) {

  if (phoneNumber !== null && phoneNumber.length === 10) {
    // Max 160 chars
    var txtmsg = "Your TutorBase account has been created."; 
    var resul = textsender.send(txtmsg, phoneNumber, null, "us");
    console.log(resul);
  }

  var htmlOrig = fs.readFileSync(__dirname + '/email_signup.txt').toString();

  var html = htmlOrig.replace("{{name}}", name);

  var emailresul = emailsender.send(email, html, "TutorBase Account Created");

  console.log("Signup Email Send Complete");

}

//Localhost:3000/signup
router.post("/", function (req, res, next) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) return next(err);
      if (user) return next(console.log("User exists: " + user));

      console.log("Creating new user\n" + req.body.first_name,req.body.last_name,req.body.email,req.body.phone, req.body.password);
      let newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 12),
        phone: req.body.phone
      });
      newUser.save();
      signupNotify(req.body.first_name + ' ' + req.body.last_name, req.body.email, req.body.phone);
    }
  ).then(data => {
    if (data) {
      res.redirect("/home"); //Broken
    }
  });
});

module.exports = router;
