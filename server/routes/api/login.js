/** Express router providing user related routes
 * @module routes/api/login
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
const { token } = require("morgan");
// const Token = require('../../models/Tokens');

// Cookie Parser Function
var parseCookies = require("../../lib/parseCookies");

/*
Secret for token generation
Move this when moving to prod.
*/
const secret = require("../../config/secret");

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
      var tok = jwt.sign({ userid: user._id }, secret);

      // Token Storage can be used if necessary later on
      // var tokenModel = new Token({ token: tok, uid: user._id })
      // tokenModel.save(function (err) {
      //   if (err) return handleError(err);
      //   // saved!
      // });

      //MaxAge: 24 Hours
      res.cookie("token", tok, { httpOnly: true, maxAge: 86400000, secure: true })
      return res.redirect('http://localhost:3000/home');
    });

  })(req, res, next);
});

/**
 * Route serving client side authentication.
 * Client side token is passed and verfied by us through jwt based on the secret.
 * @name get/auth/loginRouter
 * @memberof module:routes/loginRouter
 * 
 */
router.get('/auth', (req, res) => {
  tok = parseCookies(req.headers.cookie).token
  // console.log(tok)

  try {
    payload = jwt.verify(tok, secret)
  } catch (err) {
    res.status(401)
    return res.send("Failure")
  }

  res.status(200)
  return res.send(payload)

});

module.exports = router;
