const mongoose = require('mongoose');
const commonFields = require('./common.model');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
}, { _id: true });

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [cartItemSchema],
  isActive: { type: Boolean, default: true }
});

cartSchema.add(commonFields);

// Indexes for better performance
cartSchema.index({ userId: 1 });
cartSchema.index({ isActive: 1 });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
