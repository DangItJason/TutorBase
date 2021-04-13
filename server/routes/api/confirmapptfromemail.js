var express = require("express");
var router = express.Router();

const Appointment = require("../../models/Appointment");
const ApptConfToken = require("../../models/ApptConfToken");


// This endpoint allows external confirmations of appointments (from email sent to tutor)
// GET: /api/confirmappt/?id={appointment id}&confToken={confirmation token}
router.get("/", async (req, res) => {
    var appointment;
    var appointmentconftoken;
    try {
        appointment = await Appointment.findOne(
            { 
                appt_id: req.query.id 
            }
        );
        appointmentconftoken = await ApptConfToken.findOne(
            { 
                appt_id: req.query.id,
                appt_confirmation_token: req.query.confToken
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
    res.send("Appointment successfully confirmed.");
});


module.exports = router;