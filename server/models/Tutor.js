const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    email: {type: String, required: true}, // User email (ID)
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},

    profile_img: {type: String, default: ""},
    phone: {type: String, default: ""},

    // Time they can tutor
    times: {"Sunday": [[Number, Number]], "Monday": [[Number, Number]], "Tuesday": [[Number, Number]], "Wednesday": [[Number, Number]], "Thursday": [[Number, Number]], "Friday": [[Number, Number]], "Saturday": [[Number, Number]]},

    price: {type: Number, default: 30},
    interval: {type: Number, default: 30},
});

module.exports = User = mongoose.model('Tutor', TutorSchema);
