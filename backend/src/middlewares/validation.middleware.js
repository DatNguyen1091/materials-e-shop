const Joi = require('joi');
const { ValidationError } = require('../utils/errors');

// Import validators
const productValidators = require('../validators/product.validator');
const categoryValidators = require('../validators/category.validator');
const orderValidators = require('../validators/order.validator');
const cartValidators = require('../validators/cart.validator');

// Combine all validators
const schemas = {
  // Product validators
  createProduct: productValidators.createProduct,
  updateProduct: productValidators.updateProduct,
  searchProducts: productValidators.searchProducts,

  // Category validators
  createCategory: categoryValidators.createCategory,
  updateCategory: categoryValidators.updateCategory,
  searchCategories: categoryValidators.searchCategories,

  // User validators
  createUser: Joi.object({
    fullname: Joi.string().min(1).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional(),
    address: Joi.string().max(255).optional(),
    roleId: Joi.string().optional()
  }),

  updateUser: Joi.object({
    fullname: Joi.string().min(1).max(100).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional(),
    address: Joi.string().max(255).optional(),
    roleId: Joi.string().optional(),
    isActive: Joi.boolean().optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Message validators
  createMessage: Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    channelId: Joi.string().required(),
    receiverId: Joi.string().optional()
  }),

  // Order validators
  createOrder: orderValidators.createOrder,
  updateOrder: orderValidators.updateOrder,
  updateOrderStatus: orderValidators.updateOrderStatus,

  // Cart validators
  addToCart: cartValidators.addToCart,
  updateCartItem: cartValidators.updateCartItem,
  applyCoupon: cartValidators.applyCoupon,

  // Delivery address validators
  createDeliveryAddress: Joi.object({
    fullName: Joi.string().min(1).max(100).required(),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
    address: Joi.string().min(1).max(255).required(),
    city: Joi.string().min(1).max(100).required(),
    district: Joi.string().min(1).max(100).required(),
    ward: Joi.string().min(1).max(100).required(),
    isDefault: Joi.boolean().default(false)
  }),

  updateDeliveryAddress: Joi.object({
    fullName: Joi.string().min(1).max(100).optional(),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional(),
    address: Joi.string().min(1).max(255).optional(),
    city: Joi.string().min(1).max(100).optional(),
    district: Joi.string().min(1).max(100).optional(),
    ward: Joi.string().min(1).max(100).optional(),
    isDefault: Joi.boolean().optional()
  })
};

/**
 * Validate request body
 * @param {string} schemaName - Name of the schema to validate against
 * @returns {Function} Express middleware function
 */
const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return next(new ValidationError(`Schema '${schemaName}' not found`));
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return next(new ValidationError('Validation failed', errors));
    }

    // Replace req.body with validated data
    req.body = value;
    next();
  };
};

/**
 * Validate request query parameters
 * @param {string} schemaName - Name of the schema to validate against
 * @returns {Function} Express middleware function
 */
const validateQuery = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return next(new ValidationError(`Schema '${schemaName}' not found`));
    }

    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return next(new ValidationError('Query validation failed', errors));
    }

    // Replace req.query with validated data
    req.query = value;
    next();
  };
};

/**
 * Validate request parameters
 * @param {string} schemaName - Name of the schema to validate against
 * @returns {Function} Express middleware function
 */
const validateParams = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return next(new ValidationError(`Schema '${schemaName}' not found`));
    }

    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return next(new ValidationError('Parameter validation failed', errors));
    }

    // Replace req.params with validated data
    req.params = value;
    next();
  };
};

module.exports = {
  validate,
  validateQuery,
  validateParams,
  schemas
}; 