const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Login
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username
 *               password:
 *                 type: string
 *                 description: Password
 *     responses:
 *       201:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Invalid input
 */
router.post('/', authController.login);

/**
 * @swagger
 * /api/auth:
 *   put:
 *     summary: Refresh token
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token
 *               userId:
 *                 type: string
 *                 description: User Id
 *     responses:
 *       201:
 *         description: Refresh token successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Invalid input
 */
router.put('/', authController.refreshToken);


module.exports = router;