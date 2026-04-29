const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  first_name: String,
  last_name: String,
  profile_picture: String,
  is_active: { type: Boolean, default: true },
  role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Pre-save hook: hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

// Static method to compare password
userSchema.statics.comparePassword = async function (candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash);
};

module.exports = mongoose.model('User', userSchema);
