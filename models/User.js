const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

module.exports = mongoose.model('User', userSchema);  