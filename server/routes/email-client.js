var express = require("express");
var router = express.Router();
//cover the testAPI key later
var mandrill = require('node-mandrill')('Byr0Q1oJBN7KosdGU_skQA'); 

function sendEmail ( _name, _email, _subject, _message) {
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'tutorbaserpi@gmail.com',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error) console.log( error );
        else console.log(response);
    });
}

router.post("/", function (req, res) {
    //NOTE: Using placeholders for now
    //Fill in req.xxx, req.yyy, req.zzz later.

    var _name = req.body.name;
    var _email = req.body.email;
    var _subject = req.body.subject;
    var _message = req.body.message;

    //Implement spam protection???
    res.send("Submitted a request for an appointment");

    sendEmail ( _name, _email, _subject, _message );

    res.send("Finished submission request for an appointment");

});

module.exports = router;
