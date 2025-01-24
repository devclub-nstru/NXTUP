const mongoose = require('mongoose');

const SubmitSchema = new mongoose.Schema({
    eventId: {type: String, required: true},
    studentDetails: {type: Object, required: true}
});

const StudentRegistered = mongoose.model('StudentRegistered', SubmitSchema);

module.exports = StudentRegistered;