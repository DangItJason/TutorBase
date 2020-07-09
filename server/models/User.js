const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Appointment = require('../models/Appointment');

const ClientSchema = new Schema({
    appts: [Appointment], // Upcoming appointments
    past_appts: [Appointment] // Past appointments
});

const TutorSchema = new Schema({
    appts: [Appointment], // Upcoming appointments
    past_appts: [Appointment], // Past appointments
    price: {type: Number, required: true}
});

const UserSchema = new Schema({
    email: {type: String, required: true}, // User email (ID)
    password: {type: String, required: true}, // User password
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    client: ClientSchema,
    tutor: TutorSchema
});

module.exports = User = mongoose.model('User', UserSchema);