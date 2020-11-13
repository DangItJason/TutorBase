const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");
var mongo = require("mongodb");

// POST api/meetings/appointments
// Get all appointments from a client id
router.post("/appointments", (req, res) => {

//   var id = JSON.stringify(req.body.user_id);
  var id = mongoose.Types.ObjectId('5f23951c7b297f01f21a1877');
  console.log("Searching for objectID: " + id);
  User.findById(id, { client : 1, _id : 0 }) //Only return client fields
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
