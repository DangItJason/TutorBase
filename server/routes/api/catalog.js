/** Express router providing user related routes
 * @module routes/api/catalog
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");
const mongoose = require("mongoose");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");
const withAuth = require("../../middleware/token_auth");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace catalogRouter
 */
const router = express.Router();

/**
 * Route serving courses form.
 * @name get/api/catalog/tutor/hours/:tutor_id
 * @function
 * @memberof module:routes/api/catalog~catalogRouter
 * @inner
 * @param {string} tutor_id - Express Path
 * @param {callback} withAuth - Express Middleware
 */
// GET api/catalog/tutor/hours/tutor_id
// Get a specific tutor's availability (hours)
router.get('/tutor/hours/:tutor_id', withAuth, (req, res) => {
  User.findById(req.params.tutor_id, 'tutor.times')
    .then(hours => res.json(hours))
    .catch(err => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving courses form.
 * @name get/api/catalog/tutor/appointments/:tutor_id
 * @function
 * @memberof module:routes/api/catalog~catalogRouter
 * @inner
 * @param {string} tutor_id - Express Path
 * @param {callback} withAuth - Express Middleware
 */
// GET api/catalog/tutor/appointments/tutor_id
// Get a specific tutor's already scheduled appointments
router.get('/tutor/appointments/:tutor_id', withAuth, (req, res) => {
  User.findById(req.params.tutor_id, 'tutor.appts')
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving courses form.
 * @name post/api/catalog/tutors
 * @function
 * @memberof module:routes/api/catalog~catalogRouter
 * @inner
 */
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

/**
 * Route serving courses form.
 * @name post/api/catalog/appointment
 * @function
 * @memberof module:routes/api/catalog~catalogRouter
 * @inner
 * @param {callback} withAuth - Express Middleware
 */
// POST api/catalog/appointment
// Create a new Appointment
router.post("/appointment", withAuth, (req, res) => {
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


module.exports = router;
