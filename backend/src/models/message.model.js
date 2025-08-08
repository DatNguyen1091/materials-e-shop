const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    default: 'general' // Mặc định là phòng chat chung
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Cập nhật updatedAt trước khi lưu
messageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
