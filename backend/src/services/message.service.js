const Message = require('../models/message.model');

// Lấy tin nhắn theo room
exports.getMessagesByRoom = async (roomId, limit = 50, skip = 0) => {
    try {
        const messages = await Message.find({ roomId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('senderId', 'username avatar');
        return messages.reverse();
    } catch (error) {
        throw new Error('Error getting messages: ' + error.message);
    }
};

// Tạo tin nhắn mới
exports.createMessage = async (messageData) => {
    try {
        const message = new Message(messageData);
        const savedMessage = await message.save();
        return await Message.findById(savedMessage._id)
            .populate('senderId', 'username avatar');
    } catch (error) {
        throw new Error('Error creating message: ' + error.message);
    }
};

// Đánh dấu tin nhắn đã đọc
exports.markMessageAsRead = async (messageId, userId) => {
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            throw new Error('Message not found');
        }
        message.isRead = true;
        return await message.save();
    } catch (error) {
        throw new Error('Error marking message as read: ' + error.message);
    }
};

// Xóa tin nhắn
exports.deleteMessage = async (messageId, userId) => {
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            throw new Error('Message not found');
        }
        if (message.senderId.toString() !== userId) {
            throw new Error('You can only delete your own messages');
        }
        await message.deleteOne();
        return { message: 'Message deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting message: ' + error.message);
    }
}; 