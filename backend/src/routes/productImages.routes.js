const express = require('express');
const router = express.Router();
const finesController = require('../controllers/fines.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const authorize = require('../middlewares/authorize.middleware');
const Permissions = require('../constants/permissions.constans');

/**
 * @swagger
 * components:
 *   schemas:
 *     Fines:
 *       type: object
 *       required:
 *         - reservationId
 *         - amount
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the fine
 *         reservationId:
 *           type: string
 *           description: The ID of the reservation associated with the fine
 *         amount:
 *           type: number
 *           description: The amount of the fine
 *         reason:
 *           type: string
 *           description: The reason for the fine
 *         status:
 *           type: integer
 *           description: The status of the fine
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the fine was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the fine was last updated
 *         isDeleted:
 *           type: boolean
 *           description: Whether the fine is deleted
 *         reservation:
 *           type: object
 *           properties:
 *             borrowDate:
 *               type: string
 *               format: date-time
 *               description: The date when the book was borrowed
 *             returnDate:
 *               type: string
 *               format: date-time
 *               description: The expected return date
 *             status:
 *               type: integer
 *               description: The status of the reservation
 *             user:
 *               type: object
 *               properties:
 *                 fullname:
 *                   type: string
 *                   description: Full name of the user
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                 avatar:
 *                   type: string
 *                   description: URL to user's avatar
 *             book:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Title of the book
 *                 author:
 *                   type: string
 *                   description: Author of the book
 *                 imageUrl:
 *                   type: string
 *                   description: URL to book's image
 */

/**
 * @swagger
 * /api/fines:
 *   get:
 *     summary: Get all fines with pagination, search and filters
 *     tags: [Fines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword for filtering fines by book title
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *         description: Filter by status
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter fines by userId
 *     responses:
 *       200:
 *         description: List of fines with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Fines'
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of fines
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
//router.get('/', authenticateToken, authorize(Permissions.Fines.Read), finesController.getAll);
router.get('/', finesController.getAll);

/**
 * @swagger
 * /api/fines/{id}:
 *   get:
 *     summary: Get fine by ID
 *     tags: [Fines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fine ID
 *     responses:
 *       200:
 *         description: Fine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fines'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Fine not found
 *       500:
 *         description: Server error
 */
//router.get('/:id', authenticateToken, authorize(Permissions.Fines.Read), finesController.getById);
router.get('/:id', finesController.getById);

/**
 * @swagger
 * /api/fines:
 *   post:
 *     summary: Create a new fine
 *     tags: [Fines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reservationId
 *               - amount
 *             properties:
 *               reservationId:
 *                 type: string
 *                 description: ID of the reservation to create fine for
 *               amount:
 *                 type: number
 *                 description: Amount of the fine
 *               reason:
 *                 type: string
 *                 description: Reason for the fine
 *               status:
 *                 type: integer
 *                 description: Status of the fine
 *     responses:
 *       201:
 *         description: Fine created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fines'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
//router.post('/', authenticateToken, authorize(Permissions.Fines.Create), finesController.post);
router.post('/', finesController.post);

/**
 * @swagger
 * /api/fines/{id}:
 *   put:
 *     summary: Update fine
 *     tags: [Fines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount of the fine
 *               reason:
 *                 type: string
 *                 description: Reason for the fine
 *               status:
 *                 type: integer
 *                 description: Status of the fine
 *               reservationId:
 *                 type: string
 *                 description: ID of the reservation
 *     responses:
 *       200:
 *         description: Fine updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fines'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Fine not found
 */
//router.put('/:id', authenticateToken, authorize(Permissions.Fines.Update), finesController.put);
router.put('/:id', finesController.put);

/**
 * @swagger
 * /api/fines/{id}:
 *   delete:
 *     summary: Delete fine
 *     tags: [Fines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fine ID
 *     responses:
 *       200:
 *         description: Fine deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Fine not found
 *       500:
 *         description: Server error
 */
//router.delete('/:id', authenticateToken, authorize(Permissions.Fines.Delete), finesController.delete);
router.delete('/:id', finesController.delete);

module.exports = router;
