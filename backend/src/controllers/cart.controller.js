const cartService = require('../services/cart.service');
const { successResponse } = require('../utils/response');

// Get user's cart
const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    return successResponse(res, cart, 'Cart retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Add item to cart
const addToCart = async (req, res, next) => {
  try {
    const cart = await cartService.addToCart(req.user.id, req.body);
    return successResponse(res, cart, 'Item added to cart successfully');
  } catch (error) {
    next(error);
  }
};

// Update cart item quantity
const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateCartItem(req.user.id, itemId, quantity);
    return successResponse(res, cart, 'Cart item updated successfully');
  } catch (error) {
    next(error);
  }
};

// Remove item from cart
const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const cart = await cartService.removeFromCart(req.user.id, itemId);
    return successResponse(res, cart, 'Item removed from cart successfully');
  } catch (error) {
    next(error);
  }
};

// Clear cart
const clearCart = async (req, res, next) => {
  try {
    const result = await cartService.clearCart(req.user.id);
    return successResponse(res, result, 'Cart cleared successfully');
  } catch (error) {
    next(error);
  }
};

// Get cart summary
const getCartSummary = async (req, res, next) => {
  try {
    const summary = await cartService.getCartSummary(req.user.id);
    return successResponse(res, summary, 'Cart summary retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Move cart to wishlist
const moveToWishlist = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const result = await cartService.moveToWishlist(req.user.id, itemId);
    return successResponse(res, result, 'Item moved to wishlist successfully');
  } catch (error) {
    next(error);
  }
};

// Apply coupon to cart
const applyCoupon = async (req, res, next) => {
  try {
    const { couponCode } = req.body;
    const cart = await cartService.applyCoupon(req.user.id, couponCode);
    return successResponse(res, cart, 'Coupon applied successfully');
  } catch (error) {
    next(error);
  }
};

// Remove coupon from cart
const removeCoupon = async (req, res, next) => {
  try {
    const cart = await cartService.removeCoupon(req.user.id);
    return successResponse(res, cart, 'Coupon removed successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartSummary,
  moveToWishlist,
  applyCoupon,
  removeCoupon
};