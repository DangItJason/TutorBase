var emailsender = require("./emailsender.js");
var textsender = require("./textsender.js");



var fs = require("fs");

//TODO: get confirm appointment working and send email upon confirmation



function clientSend(phoneNumber, clientEmail) {

  if (phoneNumber !== null) {

    // Max 160 chars
    var txtmsg = "Your TutorBase appointment request has been received!\nWe're just waiting on the tutor to confirm the request and we'll send you an email if it's confirmed!";
    var resul = textsender.send(txtmsg, phoneNumber, null, "us");
  }

  //TODO: add more fields in this email
  const html = fs.readFileSync(__dirname + '/email_client_confirmation.html').toString();

  var emailresult = emailsender.send(clientEmail, html, "TutorBase Appointment Confirmation");

  return emailresult;

}

function clientSendConfirmed(phoneNumber, clientEmail, tutorName, startTime, endTime, course, location, notes) {
  var start = new Date(parseInt(startTime) * 1000).toUTCString();
  var time = start.concat(" - ", endTime);
  if (phoneNumber !== null) {

    // Max 160 chars
    var txtmsg = "Your TutorBase appointment request has been confirmed by the tutor!";
    var resul = textsender.send(txtmsg, phoneNumber, null, "us");
  }

  //TODO: add more fields in this email
  var htmlOrig = fs.readFileSync(__dirname + '/email_client_confirmed.html').toString();

  var html = htmlOrig.replace("{{tutor-name}}", tutorName)
              .replace("{{date}}", time)
              .replace("{{course}}", course)
              .replace("{{location}}", location)
              .replace("{{notes}}", notes)
              ;

  var emailresult = emailsender.send(clientEmail, html, "TutorBase Appointment Confirmed");

  return emailresult;

}

function tutorSend(apptId, confToken, phoneNumber, tutorEmail, tutorName, clientName, date, startTime, endTime, course, notes, location) {
  var start = new Date(parseInt(startTime) * 1000).toUTCString();
  var time = start.concat(" - ", endTime);

  if (phoneNumber !== null) {
    // Max 160 chars
    var txtmsg = "Someone is requesting your services on TutorBase. Check to your email to confirm the appointment."; 
    var resul = textsender.send(txtmsg, phoneNumber, null, "us");
  }

  var htmlOrig = fs.readFileSync(__dirname + '/email_tutor_confirmation.html').toString();

  var html = htmlOrig.replace("{{tutor-name}}", tutorName)
              .replace("{{client-name}}", clientName)
              .replace("{{date}}", time)
              .replace("{{time}}", time)
              .replace("{{course}}", course)
              .replace("{{location}}", location)
              .replace("{{notes}}", notes)
              .replace("{{id}}", apptId)
              .replace("{{confToken}}", confToken)
              ;

  var emailresult = emailsender.send(tutorEmail, html, "TutorBase Appointment Request");

  return emailresult;

}

function signupNotify(name, email, phoneNumber) {

  if (phoneNumber != null && phoneNumber.length === 10) {
    // Max 160 chars
    var txtmsg = "Your TutorBase account has been created."; 
    var resul = textsender.send(txtmsg, phoneNumber, null, "us");
    console.log(resul);
  }

  var htmlOrig = fs.readFileSync(__dirname + '/email_signup.html').toString();

  var html = htmlOrig.replace("{{name}}", name);

  var emailresul = emailsender.send(email, html, "TutorBase Account Created");

  console.log("Signup Email Send Complete");
}


module.exports = {
  clientSendConfirmed: clientSendConfirmed,
  client: clientSend,
  tutor: tutorSend,
  signupNotify: signupNotify
};