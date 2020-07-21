const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    id: {type: String, required: true}, // Subject ID
    courses: [String] // Array of course IDs
});

module.exports = Subject = mongoose.model('Subject', SubjectSchema);