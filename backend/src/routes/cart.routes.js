const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const { validate } = require('../middlewares/validation.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: Product ID
 *         quantity:
 *           type: number
 *           minimum: 1
 *           description: Quantity to add
 *     Cart:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: User ID
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         isActive:
 *           type: boolean
 *           description: Cart status
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Validation error or insufficient stock
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Clear cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/cart/summary:
 *   get:
 *     summary: Get cart summary
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart summary retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/cart/{itemId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 description: New quantity
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Validation error or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 */

/**
 * @swagger
 * /api/cart/{itemId}/wishlist:
 *   post:
 *     summary: Move cart item to wishlist
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Item moved to wishlist successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 */

/**
 * @swagger
 * /api/cart/coupon:
 *   post:
 *     summary: Apply coupon to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - couponCode
 *             properties:
 *               couponCode:
 *                 type: string
 *                 description: Coupon code
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *       400:
 *         description: Invalid coupon code
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Remove coupon from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupon removed successfully
 *       401:
 *         description: Unauthorized
 */

// Public routes (specific routes first)
router.get('/summary', authenticateToken, cartController.getCartSummary);
router.post('/coupon', authenticateToken, cartController.applyCoupon);
router.delete('/coupon', authenticateToken, cartController.removeCoupon);

// Protected routes
router.post('/',
  authenticateToken,
  validate('addToCart'),
  cartController.addToCart
);

router.put('/:itemId',
  authenticateToken,
  validate('updateCartItem'),
  cartController.updateCartItem
);

router.delete('/:itemId',
  authenticateToken,
  cartController.removeFromCart
);

router.post('/:itemId/wishlist',
  authenticateToken,
  cartController.moveToWishlist
);

// General routes (must be last)
router.get('/', authenticateToken, cartController.getCart);
router.delete('/', authenticateToken, cartController.clearCart);

module.exports = router; 