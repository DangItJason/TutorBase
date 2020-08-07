var express = require("express");
var router = express.Router();
const sgMail = require("@sendgrid/mail");
var fs = require("fs");

router.post("/client", function (req, res) {
  //Make sure to source the .env file before running this endpoint. If that doesn't work just copy/paste the the key from .env into here
  sgMail.setApiKey(
    process.env.SEND_GRID_API
  );
  sgMail.setSubstitutionWrappers('{{', '}}');


  //Implement spam protection???
  console.log("Preparing client-email confirmatin message");
  
  const msg = {
    to: req.body.clientEmail,
    from: "tutorbaserpi@gmail.com",
    templateId: "7ea79e53-32fb-4127-8e60-4b260cb79648",
    substitutions: {
      clientName: req.body.clientName,
    },
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send success");
    }
  });

  res.send("Client Email Send Complete");

});

router.post("/tutor", function (req, res) {
  //Make sure to source the .env file before running this endpoint. If that doesn't work just copy/paste the the key from .env into here
  sgMail.setApiKey(
    process.env.SEND_GRID_API
  );
  //Set substitution wrappers
  sgMail.setSubstitutionWrappers('{{', '}}');
  //Implement spam protection???
  console.log("Submitted a confirmation email to tutor");
  
  const msg = {
    //replace with to: req.body.tutor_email
    to: req.body.tutorEmail,
    from: "tutorbaserpi@gmail.com",
    templateId: "86fadcab-b74f-4ba8-a0dc-f7c1c9a19919",
    substitutions: {
      //Replace with req.body.xxx
      clientName: req.body.clientName,
      tutorName: req.body.tutorName,
      date: req.body.date,
      time: req.body.startTime.concat(" - ", req.body.endTime),
      class: req.body.course,
      notes: req.body.notes,
    },
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send success");
    }
  });

  res.send("Tutor Email Send Complete");
});

router.get('/confirmation', function(req, res) {
  console.log("email confirmed - hello world");
});

module.exports = router;
