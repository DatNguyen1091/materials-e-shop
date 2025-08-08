const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

/**
 * @swagger
 * /api/messages/{roomId}:
 *   get:
 *     summary: Get messages by room
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of messages to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of messages to skip
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get('/:roomId', authenticateToken, messageController.getMessages);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - roomId
 *             properties:
 *               content:
 *                 type: string
 *               roomId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message created successfully
 */
router.post('/', authenticateToken, messageController.createMessage);

/**
 * @swagger
 * /api/messages/{messageId}/read:
 *   put:
 *     summary: Mark message as read
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message marked as read
 */
router.put('/:messageId/read', authenticateToken, messageController.markAsRead);

/**
 * @swagger
 * /api/messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
 */
router.delete('/:messageId', authenticateToken, messageController.deleteMessage);

module.exports = router; 