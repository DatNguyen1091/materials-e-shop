const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permission.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const authorize = require('../middlewares/authorize.middleware');
const Permissions = require('../constants/permissions.constans');

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */
router.get('/', authenticateToken, authorize(Permissions.Permission.Read), permissionController.getAll);

/**
 * @swagger
 * /api/permissions/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 */
router.get('/:id', authenticateToken, authorize(Permissions.Permission.Read), permissionController.getById);

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resources
 *               - roleId
 *               - canCreate
 *               - canUpdate
 *               - canRead
 *               - canDelete
 *               - description
 *             properties:
 *               resources:
 *                 type: string
 *                 description: Resource this permission applies to
 *               roleId:
 *                 type: string
 *                 description: User roleId
 *               canCreate:
 *                 type: boolean
 *                 description: Can create
 *               canUpdate:
 *                 type: boolean
 *                 description: Can update
 *               canRead:
 *                 type: boolean
 *                 description: Can read
 *               canDelete:
 *                 type: boolean
 *                 description: Can delete
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Invalid input
 */
router.post('/', authenticateToken, authorize(Permissions.Permission.Create), permissionController.post);

/**
 * @swagger
 * /api/permissions/{id}:
 *   put:
 *     summary: Update permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resources:
 *                 type: string
 *                 description: Resource this permission applies to
 *               roleId:
 *                 type: string
 *                 description: User roleId
 *               canCreate:
 *                 type: boolean
 *                 description: Can create
 *               canUpdate:
 *                 type: boolean
 *                 description: Can update
 *               canRead:
 *                 type: boolean
 *                 description: Can read
 *               canDelete:
 *                 type: boolean
 *                 description: Can delete
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 */
router.put('/:id', authenticateToken, authorize(Permissions.Permission.Update), permissionController.put);

/**
 * @swagger
 * /api/permissions/{id}:
 *   delete:
 *     summary: Delete permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 */
router.delete('/:id', authenticateToken, authorize(Permissions.Permission.Delete), permissionController.delete);

module.exports = router;
