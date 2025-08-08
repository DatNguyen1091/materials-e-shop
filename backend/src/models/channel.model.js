const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isGroup: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Channel', channelSchema);
