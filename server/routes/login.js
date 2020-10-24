var express = require("express");
var router = express.Router();
var User = require("../models.js");
var bcrypt = require("bcryptjs");
var passport = require("passport");
const jwt = require('jsonwebtoken');


router.get("/", (req, res, next) => {
  passport.authenticate('cas', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.session.messages = info.message;
      return res.redirect('http://localhost:3000/signup');

    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      req.session.messages = '';
      return res.redirect('http://localhost:3000/home');
    });

    // req.logIn(user, function (err) {
    //   if (err) {
    //     return next(err);
    //   }

    //   req.session.messages = '';
    //   const payload = { user };
    //   const token = jwt.sign(payload, "elonmuskismydaddy", {
    //     expiresIn: '1h'
    //   });
    //   return res.cookie('token', token, { httpOnly: true }).redirect('http://localhost:3000/home');
    // });
  })(req, res, next);
});


module.exports = router;
