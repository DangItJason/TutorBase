var express = require("express");
var router = express.Router();

var emailsender = require("../../lib/emailsender.js");
var textsender = require("../../lib/textsender.js");

var fs = require("fs");

router.post("/client", function (req, res) {
  var phoneNumber = null; // Should be client.phone, model needs to be updated

  if (phoneNumber !== null) {

    // Max 160 chars
    var txtmsg = "Your TutorBase appointment request has been received!\nWe're just waiting on the tutor to confirm the request and we'll send you an email if it's confirmed!";
    var resul = textsender.send(txtmsg, phoneNumber, null, "us");
  }
  const html = fs.readFileSync(__dirname + '/email_client_confirmation.txt').toString();

  var clientEmail = req.body.clientEmail;

  var emailresul = emailsender.send(clientEmail, html, "TutorBase Appointment Confirmation");

  res.send("Client Email Send Complete");

});

router.post("/tutor", function (req, res) {

  var clientName = req.body.clientName;
  var tutorName = req.body.tutorName;
  var date = req.body.date;
  var time = req.body.startTime.concat(" - ", req.body.endTime);
  var course = req.body.course;
  var notes = req.body.notes;
  var location = "Folsom Library";

  var phoneNumber = null; // Should be tutor.phone, model needs to be updated

  if (phoneNumber !== null) {
    // Max 160 chars
    var txtmsg = "Someone is requesting your services on TutorBase. Check to your email to confirm the appointment.";
    var resul = textsender.send(txtmsg, phoneNumber, null, "us");
    console.log(resul);
  }

  var htmlOrig = fs.readFileSync(__dirname + '/email_tutor_confirmation.txt').toString();

  var html = htmlOrig.replace("{{tutor-name}}", tutorName)
              .replace("{{client-name}}", clientName)
              .replace("{{date}}", date)
              .replace("{{time}}", time)
              .replace("{{course}}", course)
              .replace("{{location}}", location)
              .replace("{{notes}}", notes);

  var tutorEmail = req.body.tutorEmail;

  var emailresul = emailsender.send(tutorEmail, html, "TutorBase Appointment Request");

  res.send("Tutor Email Send Complete");

});




router.get('/confirmation', function(req, res) {
  console.log("email confirmed - hello world");
});

module.exports = router;

// TODO: add client email/text when tutor confirms appointment, add signup confirm email/texts
