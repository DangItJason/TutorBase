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

  var id = mongoose.Types.ObjectId(req.body.user_id);

  console.log(JSON.stringify(req.body.user_id));
  console.log("Searching for objectID: " + id);
  User.findById(id, '-password -tutor', {lean: true})
  .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;

//POST api/meetings/movePending
//Move desired pending appointment to upcoming
router.post("/movePending", (req, res) => {

  var id = mongoose.Types.ObjectId("5f89d834aa18dfd7e932967d");

  console.log("Moving pending object to upcoming array:");
  User.updateOne({
    '_id': id
  }, {
    $pull : {'client.$.pending' : { 'name' : req.body.name }},
    $push : {'client.upcoming' : { 'client.$.pending' : { 'name' : req.body.name }}}
  })
    .then((pending) => {
      res.json(pending);
    })

})

//POST api/meetings/denyPending
//Move desired pending appointment to denied
router.post("/denyPending", (req, res) => {

  var id = mongoose.Types.ObjectId("5f89d834aa18dfd7e932967d");

  console.log("Moving pending object to denied array:");
  User.updateOne({
    '_id': id
  }, {
    $pull : {'client.$.pending' : { 'name' : req.body.name }},
    $push : {'client.denied' : { 'client.$.pending' : { 'name' : req.body.name }}}
  })
    .then((pending) => {
      res.json(pending);
    })

})