const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const authorize = require('../middlewares/authorize.middleware');
const Permissions = require('../constants/permissions.constans');
const { validate } = require('../middlewares/validation.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 50
 *           description: Category name
 *         description:
 *           type: string
 *           maxLength: 200
 *           description: Category description
 *         icon:
 *           type: string
 *           maxLength: 10
 *           description: Category icon
 *         parentCategoryId:
 *           type: string
 *           description: Parent category ID
 *         isActive:
 *           type: boolean
 *           description: Category status
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories with pagination and filters
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword
 *       - in: query
 *         name: parentCategoryId
 *         schema:
 *           type: string
 *         description: Filter by parent category
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/category/tree:
 *   get:
 *     summary: Get category tree (hierarchical)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Category tree retrieved successfully
 */

/**
 * @swagger
 * /api/category/search:
 *   get:
 *     summary: Search categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword
 *       - in: query
 *         name: parentCategoryId
 *         schema:
 *           type: string
 *         description: Filter by parent category
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Search completed successfully
 */

/**
 * @swagger
 * /api/category/stats:
 *   get:
 *     summary: Get category statistics
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Category statistics retrieved successfully
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 *   delete:
 *     summary: Delete category (soft delete)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Cannot delete category with subcategories or products
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/category/{categoryId}/subcategories:
 *   get:
 *     summary: Get subcategories of a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Parent category ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Subcategories retrieved successfully
 *       404:
 *         description: Category not found
 */

// Public routes (specific routes first)
router.get('/tree', categoryController.getCategoryTree);
router.get('/search', categoryController.searchCategories);
router.get('/stats', categoryController.getCategoryStats);
router.get('/:categoryId/subcategories', categoryController.getSubcategories);

// Protected routes
router.post('/',
  authenticateToken,
  authorize(Permissions.Category.Create),
  validate('createCategory'),
  categoryController.createCategory
);

router.put('/:id',
  authenticateToken,
  authorize(Permissions.Category.Update),
  validate('updateCategory'),
  categoryController.updateCategory
);

router.delete('/:id',
  authenticateToken,
  authorize(Permissions.Category.Delete),
  categoryController.deleteCategory
);

// General routes (must be last)
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

module.exports = router; 