var express = require("express");
var router = express.Router();
const sgMail = require("@sendgrid/mail");
const { all } = require("../app");

router.post("/", function (req, res) {

  //Implement spam protection???
  res.send("Submitted a request for an appointment");

    //Input
    //Email

    email -> key into MongoDB.find()

    -> return (name, classes, price)

    //Output
    //Name
    //Classes
    //Price
    console.output("hello world")

    //How we'd display is client side.


});

module.exports = router;
