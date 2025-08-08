const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }, 
  type: {
    type: String,
    enum: ['message', 'mention', 'group-invite'], 
    default: 'message'
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
