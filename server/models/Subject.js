const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    id: {type: String, required: true}, // Course ID
    name: {type: String, required: true}, // Course Name
    tutors: {type: [String]} // Array of Tutor IDs (emails)
});

const SubjectSchema = new Schema({
    id: {type: String, required: true}, // Subject ID
    courses: [CourseSchema] // Array of courses
});

module.exports = Subject = mongoose.model('Subject', SubjectSchema);