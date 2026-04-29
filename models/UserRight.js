const mongoose = require('mongoose');

const userRightSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  right_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Right', required: true },
  granted_at: { type: Date, default: Date.now },
  expires_at: Date, // Optional: for time-limited permissions
  is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model('UserRight', userRightSchema);
