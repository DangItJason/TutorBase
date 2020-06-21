var express = require("express");
var router = express.Router();
var User = require("../models.js");
var bcryptjs = require("bcryptjs");

router.post("/", function (req, res) {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(function (user) {
    if (!user) {
      res.redirect("/login");
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          console.log("Login success ... moving you to your home page!");
          //You can modify these redirects to our landing pages.
          res.redirect("/home");
        } else {
          console.log("Incorrect password");
          res.redirect("/");
        }
      });
    }
  });
});

module.exports = router;
