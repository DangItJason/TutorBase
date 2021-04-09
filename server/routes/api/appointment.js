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

const apptconfirm = require("../../lib/apptconfirm");

const Appointment = require("../../models/Appointment");
const ApptConfToken = require("../../models/ApptConfToken");

const { randomBytes } = require('crypto');

mongoose.set('useFindAndModify', false);

// POST api/catalog/appointment
// Create a new Appointment
router.post("/appointment", async (req, res) => {
  var startTime = req.body.date ? req.body.date : new Date();
  var endTime =  new Date(parseInt(req.body.end) * 1000).toDateString();

  let newAppt = new Appointment({
    appt_id: new mongoose.mongo.ObjectId(),
    course_id: req.body.course_id,
    start_time:startTime,
    end_time: endTime,
    location: req.body.loc ? req.body.loc : "none",
    tutor_id: req.body.tutor_id,
    client_id: req.body.client_id,
    price: req.body.price,
    notes: req.body.notes,
  });
  newAppt.save();
  let tok;
  randomBytes(256, (err, buf) => {
    if (err) {
      console.log(err);
    }
    tok = buf.toString('hex').substring(0,32);
  });

  let newAptConfToken = new ApptConfToken({
    appt_id: newAppt.appt_id,
    appt_confirmation_token: tok 
  });
  newAptConfToken.save();

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
  console.log(apptconfirm.tutor(tok, tutor.phone, tutor.email, tutor.first_name + ' ' + tutor.last_name,
      client.first_name + ' ' + client.last_name, req.body.date, startTime, endTime, course.name,
      req.body.notes, req.body.loc ? req.body.loc : "test"));
  console.log(apptconfirm.client(client.phone, client.email));

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
