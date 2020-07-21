const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    id: {type: String, required: true}, // Course ID
    name: {type: String, required: true}, // Course Name
    tutors: [String] // Array of Tutor IDs (emails)
});

module.exports = Course = mongoose.model('Course', CourseSchema);