const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const messageService = require('../services/message.service');

function initializeSocket(server) {
    const io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Middleware xác thực JWT
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error: Token is required'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Lưu thông tin user từ token vào socket
            socket.user = {
                userId: decoded.userId,
                username: decoded.sub, // username được lưu trong trường 'sub' của JWT
                role: decoded.role,
                permissions: decoded.permissions
            };
            next();
        } catch (err) {
            console.error('JWT verification error:', err);
            return next(new Error('Authentication error: Invalid token'));
        }
    });

    // Lưu trữ thông tin người dùng đang online
    const onlineUsers = new Map();

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        const userData = {
            userId: socket.user.userId,
            username: socket.user.username,
            socketId: socket.id
        };

        // Thêm user vào danh sách online
        onlineUsers.set(socket.id, userData);
        io.emit('user_list', Array.from(onlineUsers.values()));
        console.log('User joined:', userData);

        // Xử lý sự kiện gửi tin nhắn
        socket.on('send_message', async (messageData) => {
            try {
                console.log('Received message:', messageData);
                // Lưu tin nhắn vào database
                const savedMessage = await messageService.createMessage({
                    senderId: socket.user.userId,
                    content: messageData.content,
                    roomId: messageData.roomId || 'general'
                });

                console.log('Saved message:', savedMessage);
                // Gửi tin nhắn đến tất cả người dùng
                const messageToEmit = {
                    _id: savedMessage._id,
                    content: savedMessage.content,
                    roomId: savedMessage.roomId,
                    createdAt: savedMessage.createdAt,
                    senderId: {
                        _id: savedMessage.senderId._id,
                        username: savedMessage.senderId.username
                    }
                };
                console.log('Emitting message:', messageToEmit);
                io.emit('receive_message', messageToEmit);
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', { message: 'Error saving message' });
            }
        });

        // Xử lý sự kiện người dùng đang typing
        socket.on('typing', () => {
            socket.broadcast.emit('user_typing', {
                userId: socket.user.userId,
                username: socket.user.username
            });
        });

        // Xử lý sự kiện người dùng ngừng typing
        socket.on('stop_typing', () => {
            socket.broadcast.emit('user_stop_typing', {
                userId: socket.user.userId,
                username: socket.user.username
            });
        });

        // Xử lý sự kiện ngắt kết nối
        socket.on('disconnect', () => {
            const userData = onlineUsers.get(socket.id);
            if (userData) {
                onlineUsers.delete(socket.id);
                io.emit('user_list', Array.from(onlineUsers.values()));
                console.log('User disconnected:', userData);
            }
        });
    });

    return io;
}

module.exports = initializeSocket; 