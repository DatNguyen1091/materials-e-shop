const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const commonFields = require('../models/common.model');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  isActive: { type: Boolean, default: false },
});
userSchema.add(commonFields);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); 
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;