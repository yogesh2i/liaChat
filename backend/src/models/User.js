const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.users || mongoose.model('users', userSchema);