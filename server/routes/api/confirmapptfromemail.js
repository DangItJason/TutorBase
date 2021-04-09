var express = require("express");
var router = express.Router();

const Appointment = require("../../models/Appointment");
const ApptConfToken = require("../../models/ApptConfToken");

router.get("/:id/:confToken", async (req, res) => {
    var appointment;
    var appointmentconftoken;
    try {
        appointment = await Appointment.findOne(
            { 
                appt_id: id 
            }
        );
        appointmentconftoken = await ApptConfToken.findOne(
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