/** Express router providing user related routes
 * @module routes/signup
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace signupRouter
 */
const router = express.Router();

var User = require("../models/User");
var bcryptjs = require("bcryptjs");
var apptconfirm = require("../lib/apptconfirm.js");



//Localhost:3000/signup
/**
 * Route serving signup form.
 * @name get/signup
 * @function
 * @memberof module:routes/signup~signupRouter
 * @requires module:routes/signup~User
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/", function (req, res, next) {
  console.log("Signing up user!");

  console.log("Creating new user\n" + req.body.first_name,req.body.last_name,req.body.email,req.body.phone, req.body.password);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal Server Error" });
    } else {
      if (user !== null) {
        console.log("Found user : ", user);
        return res.status(409).json({ msg: "User already exists!" });
      }

      console.log("Creating new user");
      let newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: bcryptjs.hashSync(req.body.password, 12),
        phone: req.body.phone
      });
      newUser.save();

      apptconfirm.signupNotify(req.body.first_name + ' ' + req.body.last_name, req.body.email, req.body.phone);

      console.log("New user created!");
      return res.status(200).json({ msg: "success!" });
    }
  });
});

module.exports = router;
