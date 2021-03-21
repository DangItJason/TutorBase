const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    id: {type: String, required: true}, // Subject ID
    // courses: {type: Array, default: []},
});

module.exports = Subject = mongoose.model('Subject', SubjectSchema);
