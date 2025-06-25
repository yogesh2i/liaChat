const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: String, required: true },
    type: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.chats || mongoose.model('chats', chatSchema);