/** Express router providing user related routes
 * @module routes/api/meetings
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace meetingsRouter
 */
var router = express.Router();

const mongoose = require("mongoose");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");
var mongo = require("mongodb");

/**
 * Route serving subjects form.
 * @name get/api/meetings/appointments
 * @function
 * @memberof module:routes/api/meetings~meetingsRouter
 * @inner
 */
// POST api/meetings/appointments
// Get all appointments from a client id
router.post("/appointments", (req, res) => {

  var id = mongoose.Types.ObjectId(req.body.user_id);

  console.log(JSON.stringify(req.body.user_id));
  console.log("Searching for objectID: " + id);
  User.findById(id, '-password -tutor', { lean: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;

/**
 * Route serving subjects form.
 * @name get/api/meetings/movePending
 * @function
 * @memberof module:routes/api/meetings~meetingsRouter
 * @inner
 */
//POST api/meetings/movePending
//Move desired pending appointment to upcoming
router.post("/movePending", (req, res) => {

  var id = mongoose.Types.ObjectId("5f89d834aa18dfd7e932967d");

  console.log("Moving pending object to upcoming array:");
  User.updateOne({
    '_id': id
  }, {
    $pull: { 'client.$.pending': { 'name': req.body.name } },
    $push: { 'client.upcoming': { 'client.$.pending': { 'name': req.body.name } } }
  })
    .then((pending) => {
      res.json(pending);
    })

})

/**
 * Route serving subjects form.
 * @name get/api/meetings/denyPending
 * @function
 * @memberof module:routes/api/meetings~meetingsRouter
 * @inner
 */
//POST api/meetings/denyPending
//Move desired pending appointment to denied
router.post("/denyPending", (req, res) => {

  var id = mongoose.Types.ObjectId("5f89d834aa18dfd7e932967d");

  console.log("Moving pending object to denied array:");
  User.updateOne({
    '_id': id
  }, {
    $pull: { 'client.$.pending': { 'name': req.body.name } },
    $push: { 'client.denied': { 'client.$.pending': { 'name': req.body.name } } }
  })
    .then((pending) => {
      res.json(pending);
    })

})