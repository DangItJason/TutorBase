const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    id: {type: String, required: true} // Subject ID
});

module.exports = Subject = mongoose.model('Subject', SubjectSchema);