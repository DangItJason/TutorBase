/** Express router providing user related routes
 * @module routes/api/logout
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
 * @namespace logoutRouter
 */
const router = express.Router();

/**
 * Route serving client side logout
 * Client side token is passed and cleared.
 * @name get/logout

 */
 router.get('/', (req, res) => {

  try {
    res.clearCookie("token");
  } catch (err) {
    res.status(401)
    return res.send("Failure to clear token.")
  }

  res.status(200)
  return res.send(payload)
});

module.exports = router;