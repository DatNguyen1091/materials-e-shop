const mongoose = require('mongoose');
const commonFields = require('./common.model');

const deliveryAddressSchema = new mongoose.Schema({
  addressLine: { type: String, required: true},
  district: { type: String, required: true},
  city: { type: String, required: true},
  country: { type: String, required: true},
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
});

deliveryAddressSchema.add(commonFields);

const DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

module.exports = DeliveryAddress;
