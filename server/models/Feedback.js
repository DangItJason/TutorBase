const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    clientId: {type: String, required: true},
    tutorId: {type: String, required: true},
    message: {type: String, required: true},
    rating: {type: Number, required: true}
});

module.exports = User = mongoose.model('Feedback', FeedbackSchema);
