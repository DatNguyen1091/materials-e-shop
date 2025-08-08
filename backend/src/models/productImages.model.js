const mongoose = require('mongoose');
const commonFields = require('../models/common.model');

const productSchema = new mongoose.Schema({
    imageUrl: { type: String, maxlength: 255 },
    colorName: { type: String, maxlength: 255 },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ProductImages' },
});
productSchema.add(commonFields);

const ProductImages = mongoose.model('ProductImages', productSchema);

module.exports = ProductImages;