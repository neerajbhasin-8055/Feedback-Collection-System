// backend/models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    name: String,
    contactNumber: String,
    email: String,
    feedbackMessage: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
