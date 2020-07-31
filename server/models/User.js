const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Appointment = require('../models/Appointment').schema;

const UserSchema = new Schema({
    email: {type: String, required: true}, // User email (ID)
    password: {type: String, required: true}, // User password
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    client: {
        appts: [Appointment], // Upcoming appointments
        past_appts: [Appointment] // Past appointments
    },
    tutor: {
        appts: [Appointment], // Upcoming appointments
        past_appts: [Appointment], // Past appointments
        price: {type: Number, default: 30}
    }
});

module.exports = User = mongoose.model('User', UserSchema);