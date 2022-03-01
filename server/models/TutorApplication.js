const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorApplicationSchema = new Schema({
    userId: {type: String, required: true}, // This is the "user"'s id. The mongoDB ID that was created when creating a user
    rin: {type: String, required: true},
    subjects: [{type: String}],
    comments: {type: String, default: ""},
    rate: {type: Number, default: 0}

    
});

module.exports = User = mongoose.model('TutorApplication', TutorApplicationSchema);
