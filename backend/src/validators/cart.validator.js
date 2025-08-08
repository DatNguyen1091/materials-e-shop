const Joi = require('joi');

const cartValidators = {
  addToCart: Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).default(1)
  }),

  updateCartItem: Joi.object({
    quantity: Joi.number().min(1).required()
  }),

  applyCoupon: Joi.object({
    couponCode: Joi.string().min(3).max(20).required()
  })
};

module.exports = cartValidators; 