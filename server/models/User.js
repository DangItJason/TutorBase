const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Appointment = require('../models/Appointment').schema;

const UserSchema = new Schema({
    email: {type: String, required: true}, // User email (ID)
    password: {type: String, required: true}, // User password
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    profile_img: {type: String, default: ""},
    client: {
        upcoming: [Appointment], // Upcoming appointments
        completed: [Appointment], // Past (Completed) appointments 
        pending: [Appointment], // Pending Appointments
        declined: [Appointment] // Declined Appointments
    },
    tutor: {
        upcoming_appts: [Appointment], // Upcoming appointments
        completed_appts: [Appointment], // Past (Completed) appointments 
        pending_appts: [Appointment], // Pending Appointments
        declined_appts: [Appointment], // Declined Appointments
        courses: [Schema.ObjectId],
        times: [[Date], [Date], [Date], [Date], [Date], [Date], [Date]],
        price: {type: Number, default: 30}
    }
});

module.exports = User = mongoose.model('User', UserSchema);