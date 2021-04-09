const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApptConfTokensSchema = new Schema({
    appt_id: {type: String, required: true},
    appt_confirmation_token: {type: String, required: true},
});

module.exports = ApptConfTokens = mongoose.model('ApptConfTokens', ApptConfTokensSchema);
