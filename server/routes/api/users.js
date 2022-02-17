/** Express router providing user related routes
 * @module routes/api/users
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');
const User = require("../../models/User");
const apptconfirm = require("../../lib/apptconfirm");
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userRouter
 */
let router = express.Router();

// Middleware
const withAuth = require('../../middleware/token_auth');

/**
 * Route serving subjects form.
 * @name get/api/users
 * @function
 * @memberof module:routes/api/users~userRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// GET /api/users
// Get all users
router.get('/', (req, res) => {
  User.find()
    .sort({ name: 1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving subjects form.
 * @name get/api/users/user
 * @function
 * @memberof module:routes/api/users~userRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// GET /api/users/user
// Get user by id
router.get('/user', (req, res) => {
  User.find({ _id: req.query.userid })
    .sort({ name: 1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving subjects form.
 * @name get/api/users - email
 * @function
 * @memberof module:routes/api/users~userRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// GET /api/users?email=test@test.com
// Get user by email
router.get('/', withAuth, (req, res) => {
  User.find({ email: req.query.email })
    .sort({ name: 1 })
    .then((tutors) => res.json(tutors))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving subjects form.
 * @name post/api/users
 * @function
 * @memberof module:routes/api/users~userRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// POST /api/users
// Create a user
router.post('/', async (req, res) => {
  try {
    const userExists = await User.find({ email: req.body.email })
      .sort({ name: 1 })
      .then((users) => users);

    if (0 < userExists.length) {
      return res.status(409).json({ msg: 'User already exists!' });
    }
  } catch {
    return res.status(400).json({ msg: err.message });
  }

  const newUser = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  apptconfirm.signupNotify(
    req.body.first_name + ' ' + req.body.last_name,
    req.body.email,
    req.body.phone
  );

  const user = await newUser.save();

  req.logIn(user, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    let tok = jwt.sign({ userid: user._id }, secret);

    //MaxAge: 24 Hours
    res.cookie('token', tok, {
      httpOnly: true,
      maxAge: 86400000,
      secure: true,
      sameSite: false,
    });
    
    return res.json({ link: 'http://localhost:3000/home/schedule' });
  });
});

/**
 * Route serving subjects form.
 * @name put/api/users/user
 * @function
 * @memberof module:routes/api/users~userRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// PUT /api/users/user
// Update a user
router.put("/user", withAuth, (req, res) => {
  const entries = Object.keys(req.body)
  const updates = {}

  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i]
  }

  User.updateOne(
    { _id: req.body.userid },
    { $set: updates }
  )
  .then((user) => res.json('User updated!'))
  .catch((err) => res.status(400).json({ msg: err.message }));
});


module.exports = router;
