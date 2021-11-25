const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    appt_id: {type: String, required: true},
    course_id: {type: String, required: true},

    start_time: {type: Date, required: true},
    end_time: {type: Number, required: true},
    // END TIME SHOULD BE A DATE BUT ITS A NUMBER
    // CHANING IT COULD BREAK THINGS
    // IM NOT BRAVE ENOUGH TO DO SUCH
    // SO IF YOU WANT TO BE BRAVE
    // CHANGE IT FROM A NUMBER TO A DATE AND FIX THE ERRORS
    // - NICK

    location: {type: String, required: true},

    tutor_id: {type: Schema.ObjectId, required: true}, // Object ID of tutor
    client_id: {type: Schema.ObjectId, required: true}, // Object ID of client

    price: {type: Number, required: true}, // Total price of session
    notes: String,

    confirmed: {type: Boolean, default: false}, // Accepted by tutor

    link: {type: String, required: false}, // Link to zoom/webex
});

module.exports = Appointment = mongoose.model('Appointment', AppointmentSchema);
