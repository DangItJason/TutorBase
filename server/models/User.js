const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, required: true}, // User email (ID)
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    profile_img: {type: String, default: ""},
    phone: {type: String, default: ""},
});

module.exports = User = mongoose.model('User', UserSchema);
