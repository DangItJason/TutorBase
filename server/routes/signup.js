var express = require("express");
var router = express.Router();
var User = require("../models.js");
var bcryptjs = require("bcryptjs");

//Localhost:3000/signup
router.post('/', function (req, res, next) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) return next(err);
      if (user) return next(console.log("User exists: " + user));

      console.log("Creating new user");
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 12),
      });
      newUser.save();
    }
  ).then(function (data) {
    if (data) {
      //Change end point to whatever the landing page is
      res.redirect("/home");
    }
  });
  res.send("sign-up complete [test]");
});

module.exports = router
