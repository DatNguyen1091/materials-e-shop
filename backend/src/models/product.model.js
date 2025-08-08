const mongoose = require('mongoose');
const commonFields = require('./common.model');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    maxlength: 255,
    trim: true
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  originalPrice: { 
    type: Number,
    min: 0
  },
  discount: { 
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  description: { 
    type: String,
    maxlength: 2000
  },
  imageUrl: { 
    type: String, 
    maxlength: 255 
  },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, maxlength: 100 },
    isPrimary: { type: Boolean, default: false }
  }],
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Category' 
  },
  brand: { 
    type: String,
    maxlength: 100
  },
  sku: { 
    type: String,
    unique: true,
    sparse: true
  },
  quantity: { 
    type: Number, 
    required: true,
    min: 0,
    default: 0
  },
  rating: { 
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  specs: { 
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  tags: [{
    type: String,
    maxlength: 50
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
});

// Add common fields
productSchema.add(commonFields);

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ categoryId: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ sku: 1 });

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  if (this.discount > 0) {
    return this.price * (1 - this.discount / 100);
  }
  return this.price;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.quantity === 0) return 'out_of_stock';
  if (this.quantity < 10) return 'low_stock';
  return 'in_stock';
});

// Pre-save middleware
productSchema.pre('save', function(next) {
  // Generate SKU if not provided
  if (!this.sku) {
    this.sku = `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Set original price if not set
  if (!this.originalPrice) {
    this.originalPrice = this.price;
  }
  
  next();
});

// Instance methods
productSchema.methods.updateStock = function(quantity) {
  if (quantity < 0) {
    throw new Error('Stock quantity cannot be negative');
  }
  this.quantity = quantity;
  return this.save();
};

productSchema.methods.addReview = function(rating) {
  const totalRating = this.rating * this.reviewCount + rating;
  this.reviewCount += 1;
  this.rating = totalRating / this.reviewCount;
  return this.save();
};

productSchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

// Static methods
productSchema.statics.findByCategory = function(categoryId, options = {}) {
  const { page = 1, limit = 10, sort = '-createdAt' } = options;
  const skip = (page - 1) * limit;
  
  return this.find({ categoryId, isActive: true })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('categoryId', 'name');
};

productSchema.statics.search = function(keyword, filters = {}) {
  const query = { isActive: true };
  
  if (keyword) {
    query.$text = { $search: keyword };
  }
  
  if (filters.categoryId) {
    query.categoryId = filters.categoryId;
  }
  
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
  }
  
  if (filters.brand) {
    query.brand = new RegExp(filters.brand, 'i');
  }

  if (filters.inStock) {
    query.quantity = { $gt: 0 };
  }

  if (filters.isFeatured) {
    query.isFeatured = true;
  }
  
  return this.find(query).populate('categoryId', 'name');
};

productSchema.statics.getFeaturedProducts = function(limit = 10) {
  return this.find({ 
    isFeatured: true, 
    isActive: true 
  })
    .limit(limit)
    .populate('categoryId', 'name')
    .sort('-rating');
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
