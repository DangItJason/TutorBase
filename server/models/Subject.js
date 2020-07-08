const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    id: {type: String, required: true}, // Subject ID
    courses: {type: [CourseSchema]} // Array of courses
});

const CourseSchema = new Schema({
    id: {type: String, required: true}, // Course ID
    name: {type: String, required: true}, // Course Name
    tutors: {type: [String]} // Array of Tutor IDs (emails)
});

module.exports = Subject = mongoose.model('subject', SubjectSchema);