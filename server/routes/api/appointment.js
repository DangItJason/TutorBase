/** Express router providing user related routes
 * @module routes/appointment
 * @requires express
 */


/**
* express module
* @const
*/
const express = require('express');
const fetch = require('node-fetch');
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace appointmentOperationsRouter
 */
let router = express.Router();

// Middleware
const withAuth = require('../../middleware/token_auth');

const mongoose = require("mongoose");

const apptconfirm = require("../../lib/apptconfirm");

const Appointment = require("../../models/Appointment");
const User = require("../../models/User");
const Tutor = require("../../models/Tutor");
const ApptConfToken = require("../../models/ApptConfToken");
const secrets = require("../../lib/secrets");
const { promisify } = require('util')

const randomBytesAsync = promisify(require('crypto').randomBytes)

//mongoose.set('useFindAndModify', false);

/**
 * Route serving subjects form.
 * @name get/api/appointment
 * @function
 * @memberof module:routes/api/users~userRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// GET /api/appointment
// Get all appointment
router.get("/", (req, res) => {
  Appointment.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving subjects form.
 * @name get/api/appointment
 * @function
 * @memberof module:routes/api/users~userRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// GET /api/appointment
// Get all appointment
router.get("/:appt_id/paymentconfirmed", async (req, res) => {
  res.json({confirmed: await checkPaymentConfirmed( req.params.appt_id)});
});


/**
 * Route serving subjects form.
 * @name post/api/appointment
 * @function
 * @memberof module:routes/api/appointment~appointmentOperationsRouter
 * @inner
 */
// POST api/appointment
// Create a new Appointment
router.post("/", async (req, res) => {
  var startTime = req.body.date ? req.body.date : new Date();
  var endTime = req.body.end ? req.body.end : new Date();
  var client, tutor, course, paypal_tx;
    try {
      client = await User.findOne(
        { _id: req.body.client_id }
      );
      tutor = await Tutor.findOne(
        { _id: req.body.tutor_id }
      );
      course = await Course.findOne(
        { id: req.body.course_id }
      );
    } catch (e) {
      console.log(e);
      return;
    }
  console.log("START TIME: ", startTime)
  console.log("END TIME: ", endTime)
console.log(tutor);
  if (tutor.paypal_email !== null) {
    // Create paypal payment
    var postbody = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.body.price * (endTime - startTime) / 1000 / 60 / 60
          },
          payee: {
            email_address: tutor.paypal_email
          }
        }
      ]
    }
    try {
      const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: 'post', 
      body: JSON.stringify(postbody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Basic ' + Buffer.from(secrets.PAYPALAPITOKEN).toString('base64')
      }
      });
      const json = await response.json();
      var txlink = json.links[1].href;
      paypal_tx = txlink.substring(txlink.indexOf("token=") + 6);
    }
    catch(err) {
      console.log(err);
    }
  }

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
    paypal_tx: paypal_tx,
    paypal_approved: false
  });
  
  newAppt.save();
  let tokBytes, tok;
  tokBytes = await randomBytesAsync(256);
  tok = tokBytes.toString('hex').substring(0, 32);


  let newAptConfToken = new ApptConfToken({
    appt_id: newAppt.appt_id,
    appt_confirmation_token: tok
  });
  newAptConfToken.save();

  // Send confirmation email and texts
  if(tutor.phone || tutor.email !== null)
    console.log(apptconfirm.tutor(newAppt.appt_id, tok, tutor.phone, tutor.email, tutor.first_name + ' ' + tutor.last_name,
      client.first_name + ' ' + client.last_name, req.body.date, startTime, endTime, course.name,
      req.body.notes, req.body.loc ? req.body.loc : "test"));

  if(client.phone || client.email !== null)
    console.log(apptconfirm.client(client.phone, client.email));

  console.log("DEBUG: Printing newAppt =>", newAppt);
  res.json(newAppt);
});

/**
 * Route serving subjects form.
 * @name put/api/appointment
 * @memberof module:routes/api/appointment~appointmentOperationsRouter
 * @param {callback} withAuth - Express middleware.
 */
// PUT api/appointment
// Update an existing Appointment
router.put('/', withAuth, (req, res) => {
  const entries = Object.keys(req.body)
  const updates = {}

  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i]
  }
  checkPaymentConfirmed(req.body.apptid);
  Appointment.updateOne(
    { appt_id: req.body.apptid },
    { $set: updates }
  )
  .then((appt) => res.json('Appointment updated!'))
  .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving subjects form.
 * @name post/api/appointment/tutors/:tutor_id
 * @function
 * @memberof module:routes/api/appointment~appointmentOperationsRouter
 * @inner
 * @param {string} tutor_id - Express Path
 */
// GET api/appointments/tutors/tutor_id
// Get a specific tutor's already scheduled appointments
router.get('/tutors/:tutor_id', (req, res) => {
  Appointment.find({ tutor_id: req.params.tutor_id })
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving subjects form.
 * @name post/api/appointment/clients/:client_id
 * @function
 * @memberof module:routes/api/appointment~appointmentOperationsRouter
 * @inner
 * @param {string} client_id - Express Path
 */
// GET api/appointments/clients/client_id
// Get a specific users's already scheduled appointments
router.get('/clients/:client_id', (req, res) => {
  Appointment.find({ client_id: req.params.client_id })
    .then(appointments => res.json(appointments))
    .catch(err => res.status(400).json({ msg: err.message }));
});


/**
 * Route serving subjects form.
 * @name post/api/appointment/link
 * @function
 * @memberof module:routes/api/appointment~appointmentOperationsRouter
 * @inner
 */
// POST api/appointment/link
// Adds meeting link to appointment
router.post("/link", async (req, res) => {
  try {
    await Appointment.updateOne(
      { appt_id: req.body.apptid },
      {$set:{link:req.body.link}});
    let appt = await Appointment.findOne(
        { appt_id: req.body.apptid }
      );
    res.json(appt);
  } catch (e) {
    console.log(e);
  }
});

async function checkPaymentConfirmed(appointmentID) {
      var appointment = await Appointment.findOne({ appt_id: appointmentID });
      if (appointment === null) {
        return false;
      }
      if (appointment.paypal_tx !== null) {
        try {
          const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders/" + appointment.paypal_tx, {
          method: 'get', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Basic ' + Buffer.from(secrets.PAYPALAPITOKEN).toString('base64')
          }
          });
          const json = await response.json();
          if (json.status === "APPROVED") {
            await Appointment.updateOne(
              { appt_id: appointmentID },
              { $set: {paypal_approved: true} }
            );
            return true;
          }
          else {
            return false;
          }
        }
        catch(err) {
          console.log(err);
          return false;
        }
      }
      return false;
    }

module.exports = router;
