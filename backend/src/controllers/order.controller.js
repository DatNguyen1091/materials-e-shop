const orderService = require('../services/order.service');
const { successResponse } = require('../utils/response');

// Create new order
const createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderService.createOrder(req.body, req.user.id);
    return successResponse(res, newOrder, 'Order created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// Get all orders with pagination and filters
const getOrders = async (req, res, next) => {
  try {
    const { page, limit, status, userId, startDate, endDate } = req.query;
    const filters = { status, userId, startDate, endDate };
    const options = { page, limit };
    
    const result = await orderService.getOrders(filters, options);
    return successResponse(res, result, 'Orders retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Get order by ID
const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    return successResponse(res, order, 'Order retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Update order
const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
    return successResponse(res, updatedOrder, 'Order updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete order (soft delete)
const deleteOrder = async (req, res, next) => {
  try {
    const result = await orderService.deleteOrder(req.params.id);
    return successResponse(res, result, 'Order deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Get orders by user
const getOrdersByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, limit, status } = req.query;
    const options = { page, limit };
    
    const orders = await orderService.getOrdersByUser(userId, status, options);
    return successResponse(res, orders, 'User orders retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);
    return successResponse(res, updatedOrder, 'Order status updated successfully');
  } catch (error) {
    next(error);
  }
};

// Get order statistics
const getOrderStats = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const stats = await orderService.getOrderStats(startDate, endDate);
    return successResponse(res, stats, 'Order statistics retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Cancel order
const cancelOrder = async (req, res, next) => {
  try {
    const result = await orderService.cancelOrder(req.params.id, req.user.id);
    return successResponse(res, result, 'Order cancelled successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  updateOrderStatus,
  getOrderStats,
  cancelOrder
};
