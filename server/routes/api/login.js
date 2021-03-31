/** Express router providing user related routes
 * @module routes/login
 * @requires express
 */

/**
 * express module
 * @const
 */
var express = require("express");
var session = require('express-session')

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace loginRouter
 */
const router = express.Router();

var User = require("../../models.js");
var bcrypt = require("bcryptjs");

/**
 * passport module
 * @const
 * @type {object}
 */
const passport = require("passport");
const jwt = require('jsonwebtoken');
const { use } = require("passport");
const Token = require('../../models/Tokens');

/**
 * Route serving login form.
 * @name get/login
 * @function
 * @memberof module:routes/login~loginRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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

      var tok = jwt.sign({ userid: user._id }, "sadfadf")

      var tokenModel = new Token({ token: tok, uid: user._id })
      tokenModel.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });

      res.cookie("token", tok)
      return res.redirect('http://localhost:3000/home');
    });

  })(req, res, next);
});

module.exports = router;
