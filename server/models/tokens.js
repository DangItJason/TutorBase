const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema({
    token: { type: String, required: true },
    uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = User = mongoose.model('Token', Token);