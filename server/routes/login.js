/** Express router providing user related routes
 * @module routes/login
 * @requires express
 */

/**
 * express module
 * @const
 */
var express = require("express");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace loginRouter
 */
const router = express.Router();

var User = require("../models.js");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * passport module
 * @const
 * @type {object}
 */
const passport = require("passport");

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
  passport.authenticate("cas", function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.session.messages = info.message;
      return res.redirect("http://localhost:3000/signup");
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      req.session.messages = "";
      return res.redirect("http://localhost:3000/home");
    });
  })(req, res, next);
});

module.exports = router;
