const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    appt_id: {type: String, required: true},
    course_id: {type: String, required: true},
    start_time: {type: Date, required: true},
    duration: {type: Number, required: true}, // minutes
    location: {type: String, required: true},
    tutor_id: {type: Schema.ObjectId, required: true}, // Object ID of tutor
    client_id: {type: Schema.ObjectId, required: true}, // Object ID of client
    price: {type: Number, required: true},
    notes: String,
    confirmed: {type: Boolean, default: false}
});

module.exports = Appointment = mongoose.model('Appointment', AppointmentSchema);