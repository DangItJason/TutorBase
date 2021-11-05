/** Express router providing user related routes
 * @module routes/api/confirmappt
 * @requires express
 */

/**
 * express module
 * @const
 */
var express = require("express");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace confirmApptRouter
 */
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/User");
const Appointment = require("../../models/Appointment");
const ApptConfToken = require("../../models/ApptConfToken");
const apptconfirm = require("../../lib/apptconfirm");

/**
 * Route serving subjects form.
 * @name get/api/confirmappt
 * @function
 * @memberof module:routes/api/confirmappt~confirmApptRouter
 * @inner
 */
// This endpoint allows external confirmations of appointments (from email sent to tutor)
// GET: /api/confirmappt/?id={appointment id}&confToken={confirmation token}
router.get("/", async (req, res) => {
  var appointment;
  var appointmentconftoken;
  try {
    appointment = await Appointment.findOne(
      {
        appt_id: req.query.id
      }
    );
    appointmentconftoken = await ApptConfToken.findOne(
      {
        appt_id: req.query.id,
        appt_confirmation_token: req.query.confToken
      }
    );
  } catch (e) {
    console.log(e);
    return;
  }
  if (appointment === null || appointmentconftoken === null) {
    console.log("error confirming appointment");
    return;
  }
  try {
    appointmentconftoken.remove();
  } catch (e) {
    console.log(e);
    return;
  }
  var client, tutor, course;
  try {
    client = await User.findOne(
      { _id: appointment.client_id }
    );
    tutor = await User.findOne(
      { _id: appointment.tutor_id }
    );
    course = await Course.findOne(
      { _id: appointment.course_id }
    );
  } catch (e) {
    console.log(e);
    return;
  }

  appointment.confirmed = true;
  appointment.save();
  apptconfirm.clientSendConfirmed(client.phone,
    client.email,
    tutor.first_name + ' ' + tutor.last_name,
    appointment.start_time,
    appointment.end_time,
    course.name,
    appointment.location,
    appointment.notes);
  res.send("Appointment successfully confirmed.");
});


module.exports = router;