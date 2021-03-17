const express = require("express");
const mongoose = require("mongoose");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");

const router = express.Router();

// GET api/catalog/tutor/hours/tutor_id
// Get a specific tutor's availability (hours)
router.get('/tutor/hours/:tutor_id', (req, res) => {
    User.findById(req.params.tutor_id, 'tutor.times')
    .then(hours => res.json(hours))
    .catch(err => res.status(400).json({ msg: err.message }));
});

// GET api/catalog/tutor/appointments/tutor_id
// Get a specific tutor's already scheduled appointments
router.get('/tutor/appointments/:tutor_id', (req, res) => {
    User.findById(req.params.tutor_id, 'tutor.appts')
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json({ msg: err.message }));
});

// POST api/catalog/tutors
// Get tutors (Users) from a list of Object IDs
router.post("/tutors", (req, res) => {
  User.find({ _id: { $in: req.body.tutor_ids } }, "-password -client", {
    lean: true,
  })
    .sort({ first_name: 1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST api/catalog/appointment
// Create a new Appointment
router.post("/appointment", (req, res) => {
  // let newAppt = new Appointment({
  //   appt_id: new mongoose.mongo.ObjectId(),
  //   course_id: req.body.course_id,
  //   date: new Date(req.body.date),
  //   start_time: req.body.start,
  //   end_time: req.body.end,
  //   location: req.body.loc,
  //   tutor_id: req.body.tutor_id,
  //   client_id: req.body.client_id,
  //   price: req.body.price,
  //   notes: req.body.notes,
  // });
  let newAppt = new Appointment({
    appt_id: new mongoose.mongo.ObjectId(),
    course_id: req.body.course_id,
    start_time: req.body.date ? req.body.date : new Date(),
    duration: parseInt(req.body.end),
    location: req.body.loc ? req.body.loc : "test",
    tutor_id: req.body.tutor_id,
    client_id: req.body.client_id,
    price: req.body.price,
    notes: req.body.notes,
  });
  newAppt.save();

  console.log("DEBUG: Printing newAppt =>", newAppt);

  // TODO: Check that both object ids exist before pushing appointment

  // Add appointment to client
  try {
    User.updateOne(
      { _id: req.body.client_id },
      { $push: { client: { appts: newAppt } } }
    );
    User.save();
  } catch (e) {
    print(e)
  }

  // User.updateOne(
  //   { _id: req.body.client_id },
  //   { $push: { client: { appts: newAppt } } }
  // ).catch((err) => res.status(400).json({ msg: err.message }));

  console.log("DEBUG: ADDED APPOINTMENT TO CLIENT!");

  // Add appointment to tutor
  try {
    User.updateOne(
      { _id: req.body.tutor_id },
      { $push: { client: { appts: newAppt } } }
    );
    User.save();
  } catch (e) {
    print(e)
  }
  // User.updateOne(
  //   { _id: req.body.tutor_id },
  //   { $push: { tutor: { appts: newAppt } } }
  // ).catch((err) => res.status(400).json({ msg: err.message }));

  console.log("DEBUG: ADDED APPOINTMENT TO TUTOR!");

  res.json(newAppt);
});

module.exports = router;
