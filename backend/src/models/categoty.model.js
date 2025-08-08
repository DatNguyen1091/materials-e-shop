const mongoose = require('mongoose');
const commonFields = require('../models/common.model');

const categorySchema = new mongoose.Schema({
    parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, maxlength: 10 }
});
categorySchema.add(commonFields);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;