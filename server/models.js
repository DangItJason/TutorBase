var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

var UserModel = mongoose.model('UserDB', UserSchema);

module.exports = UserModel;