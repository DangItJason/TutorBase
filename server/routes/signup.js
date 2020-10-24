var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcryptjs = require("bcryptjs");

//Localhost:3000/signup
router.post("/", function (req, res, next) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) return next(err);
      if (user) return next(console.log("User exists: " + user));

      console.log("Creating new user");
      let newUser = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: bcryptjs.hashSync(req.body.password, 12),
      });
      newUser.save();
    }
  ).then(data => {
    if (data) {
      res.redirect("http://localhost:3000/home"); //Broken
    }
  });
});

module.exports = router;
