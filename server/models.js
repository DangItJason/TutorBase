var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    first_name: String,
    second_name: String,
    email: String,
    password: String,
})

var UserModel = mongoose.model('UserDB', UserSchema);

module.exports = UserModel;