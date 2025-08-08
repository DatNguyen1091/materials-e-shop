const Cart = require('../models/carts.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const { AppError, NotFoundError } = require('../utils/errors');
const mongoose = require('mongoose');

class CartService {
  // Check if database is connected
  _checkDBConnection() {
    if (mongoose.connection.readyState !== 1) {
      throw new AppError('Database not connected', 503);
    }
  }

  // Get user's cart
  async getCart(userId) {
    try {
      this._checkDBConnection();
      
      const user = await User.findById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      let cart = await Cart.findOne({ userId, isActive: true })
        .populate('items.productId', 'name price imageUrl quantity isActive');

      if (!cart) {
        // Create new cart if doesn't exist
        cart = new Cart({ userId, items: [] });
        await cart.save();
      }

      // Filter out inactive products and update cart
      const validItems = cart.items.filter(item => 
        item.productId && item.productId.isActive && item.productId.quantity > 0
      );

      if (validItems.length !== cart.items.length) {
        cart.items = validItems;
        await cart.save();
      }

      return cart;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting cart: ${error.message}`, 500);
    }
  }

  // Add item to cart
  async addToCart(userId, itemData) {
    try {
      this._checkDBConnection();
      
      const { productId, quantity = 1 } = itemData;

      // Validate product
      const product = await Product.findById(productId);
      if (!product) {
        throw new NotFoundError('Product');
      }
      if (!product.isActive) {
        throw new AppError('Product is not available', 400);
      }
      if (product.quantity < quantity) {
        throw new AppError('Insufficient stock', 400);
      }

      let cart = await Cart.findOne({ userId, isActive: true });
      
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      // Check if product already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        const newQuantity = cart.items[existingItemIndex].quantity + quantity;
        if (newQuantity > product.quantity) {
          throw new AppError('Insufficient stock', 400);
        }
        cart.items[existingItemIndex].quantity = newQuantity;
      } else {
        // Add new item
        cart.items.push({
          productId,
          quantity,
          price: product.price
        });
      }

      await cart.save();
      
      return cart.populate('items.productId', 'name price imageUrl quantity isActive');
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error adding to cart: ${error.message}`, 400);
    }
  }

  // Update cart item quantity
  async updateCartItem(userId, itemId, quantity) {
    try {
      this._checkDBConnection();
      
      if (quantity <= 0) {
        throw new AppError('Quantity must be greater than 0', 400);
      }

      const cart = await Cart.findOne({ userId, isActive: true });
      if (!cart) {
        throw new NotFoundError('Cart');
      }

      const itemIndex = cart.items.findIndex(
        item => item._id.toString() === itemId
      );

      if (itemIndex === -1) {
        throw new NotFoundError('Cart item');
      }

      // Validate product stock
      const product = await Product.findById(cart.items[itemIndex].productId);
      if (!product || !product.isActive) {
        throw new AppError('Product is not available', 400);
      }
      if (product.quantity < quantity) {
        throw new AppError('Insufficient stock', 400);
      }

      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].price = product.price; // Update price in case it changed
      
      await cart.save();
      
      return cart.populate('items.productId', 'name price imageUrl quantity isActive');
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error updating cart item: ${error.message}`, 400);
    }
  }

  // Remove item from cart
  async removeFromCart(userId, itemId) {
    try {
      this._checkDBConnection();
      
      const cart = await Cart.findOne({ userId, isActive: true });
      if (!cart) {
        throw new NotFoundError('Cart');
      }

      const itemIndex = cart.items.findIndex(
        item => item._id.toString() === itemId
      );

      if (itemIndex === -1) {
        throw new NotFoundError('Cart item');
      }

      cart.items.splice(itemIndex, 1);
      await cart.save();
      
      return cart.populate('items.productId', 'name price imageUrl quantity isActive');
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error removing from cart: ${error.message}`, 400);
    }
  }

  // Clear cart
  async clearCart(userId) {
    try {
      this._checkDBConnection();
      
      const cart = await Cart.findOne({ userId, isActive: true });
      if (!cart) {
        throw new NotFoundError('Cart');
      }

      cart.items = [];
      await cart.save();

      return { message: 'Cart cleared successfully' };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error clearing cart: ${error.message}`, 500);
    }
  }

  // Get cart summary
  async getCartSummary(userId) {
    try {
      this._checkDBConnection();
      
      const cart = await this.getCart(userId);
      
      let totalItems = 0;
      let subtotal = 0;
      let discount = 0;

      cart.items.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;
      });

      const total = subtotal - discount;

      return {
        totalItems,
        subtotal,
        discount,
        total,
        itemCount: cart.items.length
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting cart summary: ${error.message}`, 500);
    }
  }

  // Move cart item to wishlist (placeholder)
  async moveToWishlist(userId, itemId) {
    try {
      this._checkDBConnection();
      
      // This would typically involve a wishlist service
      // For now, just remove from cart
      await this.removeFromCart(userId, itemId);
      
      return { message: 'Item moved to wishlist successfully' };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error moving to wishlist: ${error.message}`, 500);
    }
  }

  // Apply coupon to cart (placeholder)
  async applyCoupon(userId, couponCode) {
    try {
      this._checkDBConnection();
      
      // This would typically involve a coupon service
      // For now, just return the cart
      const cart = await this.getCart(userId);
      
      return cart;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error applying coupon: ${error.message}`, 500);
    }
  }

  // Remove coupon from cart (placeholder)
  async removeCoupon(userId) {
    try {
      this._checkDBConnection();
      
      // This would typically involve a coupon service
      // For now, just return the cart
      const cart = await this.getCart(userId);
      
      return cart;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error removing coupon: ${error.message}`, 500);
    }
  }
}

module.exports = new CartService();
