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
const apptconfirm = require("../../lib/apptconfirm");

mongoose.set('useFindAndModify', false);

// POST api/appointment
// Create a new Appointment
router.post("/", async (req, res) => {
  var startTime = req.body.date ? req.body.date : new Date();
  var endTime =  parseInt(req.body.end);

  let newAppt = new Appointment({
    appt_id: new mongoose.mongo.ObjectId(),
    course_id: req.body.course_id,
    start_time: startTime,
    end_time: endTime,
    location: req.body.loc ? req.body.loc : "none",
    tutor_id: req.body.tutor_id,
    client_id: req.body.client_id,
    price: req.body.price,
    notes: req.body.notes,
  });
  newAppt.save();

  var client, tutor, course;
  try {
    client = await User.findOne(
        { _id: req.body.client_id }
    );
    tutor = await User.findOne(
        { _id: req.body.tutor_id }
    );
    course = await Course.findOne(
        { _id: req.body.course_id }
    );
  } catch (e) {
    console.log(e);
    return;
  }

  // Send confirmation email and texts
  console.log(apptconfirm.tutor(tutor.phone, tutor.email, tutor.first_name + ' ' + tutor.last_name,
      client.first_name + ' ' + client.last_name, req.body.date, startTime, endTime, course.name,
      req.body.notes, req.body.loc ? req.body.loc : "test"));
  console.log(apptconfirm.client(client.phone, client.email));

  console.log("DEBUG: Printing newAppt =>", newAppt);
  res.json(newAppt);
});

// GET api/appointments/tutors/tutor_id
// Get a specific tutor's already scheduled appointments
router.get('/tutors/:tutor_id', (req, res) => {
  Appointment.find( { tutor_id: req.params.tutor_id } )
  .then(appointments => res.json(appointments))
  .catch(err => res.status(400).json({ msg: err.message }));
});

// GET api/appointments/clients/client_id
// Get a specific users's already scheduled appointments
router.get('/clients/:client_id', (req, res) => {
  Appointment.find( { client_id: req.params.client_id } )
  .then(appointments => res.json(appointments))
  .catch(err => res.status(400).json({ msg: err.message }));
});

module.exports = router;
