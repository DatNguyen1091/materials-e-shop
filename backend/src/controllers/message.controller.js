const messageService = require('../services/message.service');

// Lấy tin nhắn theo room
exports.getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { limit, skip } = req.query;
        const messages = await messageService.getMessagesByRoom(roomId, parseInt(limit), parseInt(skip));
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo tin nhắn mới
exports.createMessage = async (req, res) => {
    try {
        const messageData = {
            ...req.body,
            senderId: req.user.userId
        };
        const message = await messageService.createMessage(messageData);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Đánh dấu tin nhắn đã đọc
exports.markAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await messageService.markMessageAsRead(messageId, req.user.userId);
        res.json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa tin nhắn
exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const result = await messageService.deleteMessage(messageId, req.user.userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 