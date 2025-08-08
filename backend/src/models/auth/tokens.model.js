const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
  refreshToken: { type: String, required: true },
  refreshTokenExpiryTime: { type: Date, required: true},
  createdAt: { type: Date, default: Date.now }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
