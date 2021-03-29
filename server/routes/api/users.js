const express = require('express');
const User = require("../../models/User");
const apptconfirm = require("../../lib/apptconfirm");

let router = express.Router();


// GET /api/users
// Get all users
router.get("/", (req, res) => {
  User.find()
      .sort({ name: 1 })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET /api/users/:id
// Get user by id
router.get("/:id", (req, res) => {
  User.find({ _id: req.params.id })
      .sort({ name: 1 })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET /api/users?email=test@test.com
// Get user by email
router.get("/", (req, res) => {
  User.find({ email: req.query.email })
      .sort({ name: 1 })
      .then((tutors) => res.json(tutors))
      .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST /api/users
// Create a user
router.post("/", (req, res) => {
  User.find({ email: req.body.email })
      .sort({ name: 1 })
      .then((users) => res.status(409).json({msg: "User already exists!"}))
      .catch((err) => res.status(400).json({ msg: err.message }));

  const newUser = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  apptconfirm.signupNotify(req.body.first_name + ' ' + req.body.last_name, req.body.email, req.body.phone);

  newUser.save().then((user) => res.json(user));
});

// PUT /api/users
// Update a user
router.put("/:id", (req, res) => {
  const entries = Object.keys(req.body)
  const updates = {}

  for(let i = 0; i < entries.length; i++)
    updates[entries[i]] = Object.values(req.body)[i]

  User.update(
      {_id: req.params.id},
      {$set: updates}
  )
      .then((user) => res.json('User updated!'))
      .catch((err) => res.status(400).json({ msg: err.message }));
});


module.exports = router;
