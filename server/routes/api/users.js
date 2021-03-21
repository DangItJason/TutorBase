const express = require('express');
const User = require("../../models/User");

let router = express.Router();


// GET /api/users
// Get all users
router.get("/", (req, res) => {
  User.find()
      .sort({ name: 1 })
      .then((courses) => res.json(courses))
      .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
