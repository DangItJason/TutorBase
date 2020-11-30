/** Express router providing user related routes
 * @module routes/index
 * @requires express
 */


/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace indexRouter
 */
const router = express.Router();

/**
 * Route serving index form.
 * @name get/\
 * @function
 * @memberof module:routes/index~indexRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
