var express = require("express");
var router = express.Router();
var crypto = require('crypto');

router.get("/:id/:confToken", function (req, res) {
    var appointment;
    var appointmentconftoken;
    try {
        appointment = await Appointment.findOne(
            { 
                appt_id: id 
            }
        );
        appointmentconftoken = await ApptConfTokens.findOne(
            { 
                appt_id: id,
                appt_confirmation_token: req.params.confToken
            }
        );
      } catch (e) {
        console.log(e);
        return;
      }
      if (appointment === null || appointmentconftoken === null)
      {
          console.log("error confirming appointment");
          return;
      }
      try {
        appointmentconftoken.remove();
      } catch (e) {
        console.log(e);
        return;
      }
    appointment.confirmed = true;
    appointment.save();

});


module.exports = router;