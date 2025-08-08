const Product = require('../models/product.model');
const Category = require('../models/categoty.model');
const { AppError, NotFoundError, ConflictError } = require('../utils/errors');
const { paginate } = require('../utils/pagination');

class ProductService {
  // Create new product
  async createProduct(productData) {
    try {
      // Validate category exists
      const category = await Category.findById(productData.categoryId);
      if (!category) {
        throw new NotFoundError('Category');
      }

      // Check if SKU already exists
      if (productData.sku) {
        const existingProduct = await Product.findOne({ sku: productData.sku });
        if (existingProduct) {
          throw new ConflictError('SKU already exists');
        }
      }

      const product = new Product(productData);
      const savedProduct = await product.save();
      
      return savedProduct.populate('categoryId', 'name');
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error creating product: ${error.message}`, 400);
    }
  }

  // Get all products with pagination and filters
  async getProducts(filters = {}, options = {}) {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
      
      // Build query
      const query = { isActive: true };
      
      if (filters.categoryId) {
        query.categoryId = filters.categoryId;
      }
      
      if (filters.keyword) {
        query.$text = { $search: filters.keyword };
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

      // Build sort
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Execute query with pagination
      const result = await paginate(Product, query, {
        page,
        limit,
        sort,
        populate: { path: 'categoryId', select: 'name' }
      });

      return result;
    } catch (error) {
      throw new AppError(`Error getting products: ${error.message}`, 500);
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      const product = await Product.findById(id)
        .populate('categoryId', 'name');

      if (!product) {
        throw new NotFoundError('Product');
      }

      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting product: ${error.message}`, 500);
    }
  }

  // Update product
  async updateProduct(id, updateData) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new NotFoundError('Product');
      }

      // Validate category if provided
      if (updateData.categoryId) {
        const category = await Category.findById(updateData.categoryId);
        if (!category) {
          throw new NotFoundError('Category');
        }
      }

      // Check SKU uniqueness if provided
      if (updateData.sku && updateData.sku !== product.sku) {
        const existingProduct = await Product.findOne({ sku: updateData.sku });
        if (existingProduct) {
          throw new ConflictError('SKU already exists');
        }
      }

      Object.assign(product, updateData);
      const updatedProduct = await product.save();
      
      return updatedProduct.populate('categoryId', 'name');
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error updating product: ${error.message}`, 400);
    }
  }

  // Delete product (soft delete)
  async deleteProduct(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new NotFoundError('Product');
      }

      await product.deactivate();

      return { message: 'Product deleted successfully' };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error deleting product: ${error.message}`, 500);
    }
  }

  // Update product stock
  async updateStock(id, quantity) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new NotFoundError('Product');
      }

      await product.updateStock(quantity);
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error updating stock: ${error.message}`, 400);
    }
  }

  // Get featured products
  async getFeaturedProducts(limit = 10) {
    try {
      const products = await Product.getFeaturedProducts(limit);
      return products;
    } catch (error) {
      throw new AppError(`Error getting featured products: ${error.message}`, 500);
    }
  }

  // Get products by category
  async getProductsByCategory(categoryId, options = {}) {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new NotFoundError('Category');
      }

      return await Product.findByCategory(categoryId, options);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting products by category: ${error.message}`, 500);
    }
  }

  // Search products
  async searchProducts(keyword, filters = {}) {
    try {
      return await Product.search(keyword, filters);
    } catch (error) {
      throw new AppError(`Error searching products: ${error.message}`, 500);
    }
  }

  // Add product review
  async addReview(productId, rating) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new NotFoundError('Product');
      }

      if (rating < 1 || rating > 5) {
        throw new AppError('Rating must be between 1 and 5', 400);
      }

      await product.addReview(rating);
      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error adding review: ${error.message}`, 400);
    }
  }

  // Get product statistics
  async getProductStats() {
    try {
      const stats = await Product.aggregate([
        {
          $match: { isActive: true }
        },
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            totalValue: { $sum: '$price' },
            avgPrice: { $avg: '$price' },
            avgRating: { $avg: '$rating' },
            outOfStock: {
              $sum: { $cond: [{ $eq: ['$quantity', 0] }, 1, 0] }
            },
            lowStock: {
              $sum: { $cond: [{ $and: [{ $gt: ['$quantity', 0] }, { $lt: ['$quantity', 10] }] }, 1, 0] }
            }
          }
        }
      ]);

      return stats[0] || {
        totalProducts: 0,
        totalValue: 0,
        avgPrice: 0,
        avgRating: 0,
        outOfStock: 0,
        lowStock: 0
      };
    } catch (error) {
      throw new AppError(`Error getting product stats: ${error.message}`, 500);
    }
  }
}

module.exports = new ProductService(); 