const mongoose = require('mongoose');
const commonFields = require('./common.model');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  total: { type: Number, required: true }
}, { _id: true });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  notes: { type: String, maxlength: 500 },
  isActive: { type: Boolean, default: true }
});

orderSchema.add(commonFields);

// Indexes for better performance
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ isActive: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
