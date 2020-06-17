var express = require("express");
var router = express.Router();
var User = require("../models.js");

router.post("/login", function (req, res, next) {
  User.findOne(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    function (err, user) {
      if (err) return next(err);
      //User exists
      if (user) {
        console.log("User found");
        res.send({ result: true });
      } else {
        console.log("User not found / Incorrect Password");
        res.send({ result: false });
      }
    }
  );
});

module.exports = router;
