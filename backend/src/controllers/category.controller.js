const categoryService = require('../services/category.service');
const { successResponse } = require('../utils/response');

// Create new category
const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    return successResponse(res, newCategory, 'Category created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// Get all categories with pagination and filters
const getCategories = async (req, res, next) => {
  try {
    const { page, limit, keyword, parentCategoryId } = req.query;
    const filters = { keyword, parentCategoryId };
    const options = { page, limit };
    
    const result = await categoryService.getCategories(filters, options);
    return successResponse(res, result, 'Categories retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Get category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    return successResponse(res, category, 'Category retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Update category
const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    return successResponse(res, updatedCategory, 'Category updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete category (soft delete)
const deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    return successResponse(res, result, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Get category tree (hierarchical)
const getCategoryTree = async (req, res, next) => {
  try {
    const tree = await categoryService.getCategoryTree();
    return successResponse(res, tree, 'Category tree retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Get subcategories
const getSubcategories = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { page, limit } = req.query;
    const options = { page, limit };
    
    const subcategories = await categoryService.getSubcategories(categoryId, options);
    return successResponse(res, subcategories, 'Subcategories retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Search categories
const searchCategories = async (req, res, next) => {
  try {
    const { keyword, parentCategoryId } = req.query;
    const filters = { keyword, parentCategoryId };
    
    const categories = await categoryService.searchCategories(filters);
    return successResponse(res, categories, 'Search completed successfully');
  } catch (error) {
    next(error);
  }
};

// Get category statistics
const getCategoryStats = async (req, res, next) => {
  try {
    const stats = await categoryService.getCategoryStats();
    return successResponse(res, stats, 'Category statistics retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryTree,
  getSubcategories,
  searchCategories,
  getCategoryStats
};