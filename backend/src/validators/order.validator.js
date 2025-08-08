const Joi = require('joi');

const orderValidators = {
  createOrder: Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required()
      })
    ).min(1).required(),
    shippingAddress: Joi.object({
      street: Joi.string().max(255).required(),
      city: Joi.string().max(100).required(),
      state: Joi.string().max(100).required(),
      zipCode: Joi.string().max(20).required(),
      country: Joi.string().max(100).required()
    }).optional(),
    notes: Joi.string().max(500).optional()
  }),

  updateOrder: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').optional(),
    shippingAddress: Joi.object({
      street: Joi.string().max(255).required(),
      city: Joi.string().max(100).required(),
      state: Joi.string().max(100).required(),
      zipCode: Joi.string().max(20).required(),
      country: Joi.string().max(100).required()
    }).optional(),
    notes: Joi.string().max(500).optional()
  }),

  updateOrderStatus: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').required()
  })
};

module.exports = orderValidators; 