const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    id: {type: String, required: true}, // Course ID
    subject: {type: String, required: true},
    name: {type: String, required: true}, // Course Name
    tutors: [Schema.ObjectId] // Array of Tutor IDs (Object IDs)
});

module.exports = Course = mongoose.model('Course', CourseSchema);
