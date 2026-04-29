const mongoose = require('mongoose');

const rightSchema = new mongoose.Schema({
  right_name: { type: String, required: true, unique: true },
  description: String,
  scope: String, // e.g., "post", "user", "comment"
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Right', rightSchema);
