/** Express router providing user related routes
 * @module routes/tutors
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
 * @namespace tutorOperationsRouter
 */
let router = express.Router();

const mongoose = require("mongoose");
const Appointment = require("../../models/Appointment");

mongoose.set('useFindAndModify', false);

// POST api/catalog/appointment
// Create a new Appointment
router.post("/appointment", (req, res) => {
  let newAppt = new Appointment({
    appt_id: new mongoose.mongo.ObjectId(),
    course_id: req.body.course_id,
    start_time: req.body.start ? req.body.start : new Date(),
    end_time: parseInt(req.body.end),
    location: req.body.loc ? req.body.loc : "none",
    tutor_id: req.body.tutor_id,
    client_id: req.body.client_id,
    price: req.body.price,
    notes: req.body.notes,
  });
  newAppt.save();

  console.log("DEBUG: Printing newAppt =>", newAppt);
  res.json(newAppt);
});

// GET api/catalog/appointments/tutor_id
// Get a specific tutor's already scheduled appointments
router.get('/appointments/:tutor_id', (req, res) => {
  Appointment.find( { tutor_id: req.params.tutor_id } )
  .then(appointments => res.json(appointments))
  .catch(err => res.status(400).json({ msg: err.message }));
});

// GET api/catalog/appointments/client_id
// Get a specific users's already scheduled appointments
router.get('/appointments/:client_id', (req, res) => {
  Appointment.find( { client_id: req.params.client_id } )
  .then(appointments => res.json(appointments))
  .catch(err => res.status(400).json({ msg: err.message }));
});

module.exports = router;
