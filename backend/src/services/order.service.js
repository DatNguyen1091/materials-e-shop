const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const { AppError, NotFoundError, ConflictError } = require('../utils/errors');
const { paginate } = require('../utils/pagination');
const mongoose = require('mongoose');

class OrderService {
  // Check if database is connected
  _checkDBConnection() {
    if (mongoose.connection.readyState !== 1) {
      throw new AppError('Database not connected', 503);
    }
  }

  // Create new order
  async createOrder(orderData, userId) {
    try {
      this._checkDBConnection();
      
      // Validate user
      const user = await User.findById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      // Validate products and calculate totals
      let totalAmount = 0;
      const orderItems = [];

      for (const item of orderData.items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new NotFoundError(`Product with ID ${item.productId}`);
        }
        if (!product.isActive) {
          throw new AppError(`Product ${product.name} is not available`, 400);
        }
        if (product.quantity < item.quantity) {
          throw new AppError(`Insufficient stock for product ${product.name}`, 400);
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        orderItems.push({
          productId: product._id,
          productName: product.name,
          productPrice: product.price,
          quantity: item.quantity,
          total: itemTotal
        });

        // Update product stock
        await Product.findByIdAndUpdate(product._id, {
          $inc: { quantity: -item.quantity }
        });
      }

      const order = new Order({
        userId,
        items: orderItems,
        totalAmount,
        status: 'pending',
        ...orderData
      });

      const savedOrder = await order.save();
      
      return savedOrder.populate([
        { path: 'userId', select: 'name email' },
        { path: 'items.productId', select: 'name price imageUrl' }
      ]);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error creating order: ${error.message}`, 400);
    }
  }

  // Get all orders with pagination and filters
  async getOrders(filters = {}, options = {}) {
    try {
      this._checkDBConnection();
      
      const { page = 1, limit = 10 } = options;
      
      // Build query
      const query = { isActive: true };
      
      if (filters.status) {
        query.status = filters.status;
      }
      
      if (filters.userId) {
        query.userId = filters.userId;
      }
      
      if (filters.startDate || filters.endDate) {
        query.createdAt = {};
        if (filters.startDate) {
          query.createdAt.$gte = new Date(filters.startDate);
        }
        if (filters.endDate) {
          query.createdAt.$lte = new Date(filters.endDate);
        }
      }

      // Execute query with pagination
      const result = await paginate(Order, query, {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: [
          { path: 'userId', select: 'name email' },
          { path: 'items.productId', select: 'name price imageUrl' }
        ]
      });

      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting orders: ${error.message}`, 500);
    }
  }

  // Get order by ID
  async getOrderById(id) {
    try {
      this._checkDBConnection();
      
      const order = await Order.findById(id)
        .populate([
          { path: 'userId', select: 'name email' },
          { path: 'items.productId', select: 'name price imageUrl' }
        ]);

      if (!order) {
        throw new NotFoundError('Order');
      }

      return order;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting order: ${error.message}`, 500);
    }
  }

  // Update order
  async updateOrder(id, updateData) {
    try {
      this._checkDBConnection();
      
      const order = await Order.findById(id);
      if (!order) {
        throw new NotFoundError('Order');
      }

      // Prevent updating certain fields
      const allowedUpdates = ['status', 'shippingAddress', 'notes'];
      const filteredUpdates = {};
      
      Object.keys(updateData).forEach(key => {
        if (allowedUpdates.includes(key)) {
          filteredUpdates[key] = updateData[key];
        }
      });

      Object.assign(order, filteredUpdates);
      const updatedOrder = await order.save();
      
      return updatedOrder.populate([
        { path: 'userId', select: 'name email' },
        { path: 'items.productId', select: 'name price imageUrl' }
      ]);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error updating order: ${error.message}`, 400);
    }
  }

  // Delete order (soft delete)
  async deleteOrder(id) {
    try {
      this._checkDBConnection();
      
      const order = await Order.findById(id);
      if (!order) {
        throw new NotFoundError('Order');
      }

      // Only allow deletion of pending or cancelled orders
      if (!['pending', 'cancelled'].includes(order.status)) {
        throw new AppError('Cannot delete order that is not pending or cancelled', 400);
      }

      order.isActive = false;
      await order.save();

      return { message: 'Order deleted successfully' };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error deleting order: ${error.message}`, 500);
    }
  }

  // Get orders by user
  async getOrdersByUser(userId, status, options = {}) {
    try {
      this._checkDBConnection();
      
      const user = await User.findById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      const { page = 1, limit = 10 } = options;
      
      const query = { userId, isActive: true };
      if (status) {
        query.status = status;
      }

      const result = await paginate(Order, query, {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: [
          { path: 'userId', select: 'name email' },
          { path: 'items.productId', select: 'name price imageUrl' }
        ]
      });

      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting user orders: ${error.message}`, 500);
    }
  }

  // Update order status
  async updateOrderStatus(id, status) {
    try {
      this._checkDBConnection();
      
      const order = await Order.findById(id);
      if (!order) {
        throw new NotFoundError('Order');
      }

      const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new AppError('Invalid order status', 400);
      }

      order.status = status;
      const updatedOrder = await order.save();
      
      return updatedOrder.populate([
        { path: 'userId', select: 'name email' },
        { path: 'items.productId', select: 'name price imageUrl' }
      ]);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error updating order status: ${error.message}`, 400);
    }
  }

  // Get order statistics
  async getOrderStats(startDate, endDate) {
    try {
      this._checkDBConnection();
      
      const matchStage = { isActive: true };
      
      if (startDate || endDate) {
        matchStage.createdAt = {};
        if (startDate) {
          matchStage.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
          matchStage.createdAt.$lte = new Date(endDate);
        }
      }

      const stats = await Order.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            averageOrderValue: { $avg: '$totalAmount' },
            pendingOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
            },
            confirmedOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
            },
            shippedOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'shipped'] }, 1, 0] }
            },
            deliveredOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
            },
            cancelledOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
            }
          }
        }
      ]);

      return stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        pendingOrders: 0,
        confirmedOrders: 0,
        shippedOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting order stats: ${error.message}`, 500);
    }
  }

  // Cancel order
  async cancelOrder(id, userId) {
    try {
      this._checkDBConnection();
      
      const order = await Order.findById(id);
      if (!order) {
        throw new NotFoundError('Order');
      }

      // Check if user owns the order or is admin
      if (order.userId.toString() !== userId) {
        throw new AppError('Unauthorized to cancel this order', 403);
      }

      // Only allow cancellation of pending orders
      if (order.status !== 'pending') {
        throw new AppError('Cannot cancel order that is not pending', 400);
      }

      // Restore product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { quantity: item.quantity }
        });
      }

      order.status = 'cancelled';
      await order.save();

      return { message: 'Order cancelled successfully' };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error cancelling order: ${error.message}`, 500);
    }
  }
}

module.exports = new OrderService();
