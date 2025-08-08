const Category = require('../models/categoty.model');
const Product = require('../models/product.model');
const { AppError, NotFoundError, ConflictError } = require('../utils/errors');
const { paginate } = require('../utils/pagination');
const mongoose = require('mongoose');

class CategoryService {
  // Check if database is connected
  _checkDBConnection() {
    if (mongoose.connection.readyState !== 1) {
      throw new AppError('Database not connected', 503);
    }
  }

  // Create new category
  async createCategory(categoryData) {
    try {
      this._checkDBConnection();
      
      // Validate parent category if provided
      if (categoryData.parentCategoryId) {
        const parentCategory = await Category.findById(categoryData.parentCategoryId);
        if (!parentCategory) {
          throw new NotFoundError('Parent category');
        }
      }

      // Check if category name already exists
      const existingCategory = await Category.findOne({ 
        name: categoryData.name,
        parentCategoryId: categoryData.parentCategoryId || null
      });
      if (existingCategory) {
        throw new ConflictError('Category name already exists');
      }

      const category = new Category(categoryData);
      const savedCategory = await category.save();
      
      return savedCategory.populate('parentCategoryId', 'name');
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error creating category: ${error.message}`, 400);
    }
  }

  // Get all categories with pagination and filters
  async getCategories(filters = {}, options = {}) {
    try {
      this._checkDBConnection();
      
      const { page = 1, limit = 10 } = options;
      
      // Build query
      const query = { isActive: true };
      
      if (filters.keyword) {
        query.$or = [
          { name: { $regex: filters.keyword, $options: 'i' } },
          { description: { $regex: filters.keyword, $options: 'i' } }
        ];
      }
      
      if (filters.parentCategoryId) {
        query.parentCategoryId = filters.parentCategoryId;
      }
      
      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive === 'true';
      }

      // Execute query with pagination
      const result = await paginate(Category, query, {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: { path: 'parentCategoryId', select: 'name' }
      });

      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting categories: ${error.message}`, 500);
    }
  }

  // Get category by ID
  async getCategoryById(id) {
    try {
      this._checkDBConnection();
      
      const category = await Category.findById(id)
        .populate('parentCategoryId', 'name');

      if (!category) {
        throw new NotFoundError('Category');
      }

      return category;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting category: ${error.message}`, 500);
    }
  }

  // Update category
  async updateCategory(id, updateData) {
    try {
      this._checkDBConnection();
      
      const category = await Category.findById(id);
      if (!category) {
        throw new NotFoundError('Category');
      }

      // Validate parent category if provided
      if (updateData.parentCategoryId) {
        const parentCategory = await Category.findById(updateData.parentCategoryId);
        if (!parentCategory) {
          throw new NotFoundError('Parent category');
        }
        
        // Prevent circular reference
        if (updateData.parentCategoryId === id) {
          throw new AppError('Category cannot be its own parent', 400);
        }
      }

      // Check if category name already exists
      if (updateData.name) {
        const existingCategory = await Category.findOne({ 
          name: updateData.name,
          parentCategoryId: updateData.parentCategoryId || category.parentCategoryId,
          _id: { $ne: id }
        });
        if (existingCategory) {
          throw new ConflictError('Category name already exists');
        }
      }

      Object.assign(category, updateData);
      const updatedCategory = await category.save();
      
      return updatedCategory.populate('parentCategoryId', 'name');
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error updating category: ${error.message}`, 400);
    }
  }

  // Delete category (soft delete)
  async deleteCategory(id) {
    try {
      this._checkDBConnection();
      
      const category = await Category.findById(id);
      if (!category) {
        throw new NotFoundError('Category');
      }

      // Check if category has subcategories
      const subcategories = await Category.find({ parentCategoryId: id, isActive: true });
      if (subcategories.length > 0) {
        throw new AppError('Cannot delete category with subcategories', 400);
      }

      // Check if category has products
      const products = await Product.find({ categoryId: id, isActive: true });
      if (products.length > 0) {
        throw new AppError('Cannot delete category with products', 400);
      }

      category.isActive = false;
      await category.save();

      return { message: 'Category deleted successfully' };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error deleting category: ${error.message}`, 500);
    }
  }

  // Get category tree (hierarchical)
  async getCategoryTree() {
    try {
      this._checkDBConnection();
      
      const categories = await Category.find({ isActive: true })
        .populate('parentCategoryId', 'name')
        .sort({ name: 1 });

      const buildTree = (parentId = null) => {
        return categories
          .filter(cat => String(cat.parentCategoryId?._id || cat.parentCategoryId) === String(parentId))
          .map(cat => ({
            ...cat.toObject(),
            children: buildTree(cat._id)
          }));
      };

      return buildTree();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting category tree: ${error.message}`, 500);
    }
  }

  // Get subcategories
  async getSubcategories(categoryId, options = {}) {
    try {
      this._checkDBConnection();
      
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new NotFoundError('Category');
      }

      const { page = 1, limit = 10 } = options;
      
      const result = await paginate(Category, 
        { parentCategoryId: categoryId, isActive: true },
        {
          page,
          limit,
          sort: { name: 1 },
          populate: { path: 'parentCategoryId', select: 'name' }
        }
      );

      return result;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting subcategories: ${error.message}`, 500);
    }
  }

  // Search categories
  async searchCategories(filters = {}) {
    try {
      this._checkDBConnection();
      
      const query = { isActive: true };
      
      if (filters.keyword) {
        query.$or = [
          { name: { $regex: filters.keyword, $options: 'i' } },
          { description: { $regex: filters.keyword, $options: 'i' } }
        ];
      }
      
      if (filters.parentCategoryId) {
        query.parentCategoryId = filters.parentCategoryId;
      }
      
      if (filters.isActive !== undefined) {
        query.isActive = filters.isActive === 'true';
      }

      const categories = await Category.find(query)
        .populate('parentCategoryId', 'name')
        .sort({ name: 1 });

      return categories;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error searching categories: ${error.message}`, 500);
    }
  }

  // Get category statistics
  async getCategoryStats() {
    try {
      this._checkDBConnection();
      
      const stats = await Category.aggregate([
        {
          $match: { isActive: true }
        },
        {
          $group: {
            _id: null,
            totalCategories: { $sum: 1 },
            categoriesWithParent: {
              $sum: { $cond: [{ $ne: ['$parentCategoryId', null] }, 1, 0] }
            },
            categoriesWithoutParent: {
              $sum: { $cond: [{ $eq: ['$parentCategoryId', null] }, 1, 0] }
            }
          }
        }
      ]);

      // Get product count per category
      const productStats = await Product.aggregate([
        {
          $match: { isActive: true }
        },
        {
          $group: {
            _id: '$categoryId',
            productCount: { $sum: 1 }
          }
        }
      ]);

      return {
        ...stats[0],
        productStats: productStats
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Error getting category stats: ${error.message}`, 500);
    }
  }
}

module.exports = new CategoryService();
