var express = require("express");
var router = express.Router();
const sgMail = require("@sendgrid/mail");

router.post("/", function (req, res) {
  //Make sure to source the .env file before running this endpoint. If that doesn't work just copy/paste the the key from .env into here
  sgMail.setApiKey(
    process.env.SENDGRID_API_KEY
  );

  //Implement spam protection???
  res.send("Submitted a request for an appointment");

  const msg = {
    //replace with to: req.body.to_
    to: "nguyenjason06@gmail.com",
    from: "tutorbaserpi@gmail.com",
    subject: "Appointment Information",
    text: "What's up!",
    html: "<strong>tesing this...</strong>",
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send success");
    }
  });
});

module.exports = router;
