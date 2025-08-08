const productService = require('../services/product.service');
const { successResponse } = require('../utils/response');

// Create new product
const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    return successResponse(res, newProduct, 'Product created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// Get all products
const getProducts = async (req, res, next) => {
  try {
    const { page, limit, sortBy, sortOrder, ...filters } = req.query;
    const options = { page, limit, sortBy, sortOrder };
    
    const result = await productService.getProducts(filters, options);
    return successResponse(res, result, 'Products retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Get product by ID
const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return successResponse(res, product, 'Product retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Update product
const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    return successResponse(res, updatedProduct, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    return successResponse(res, result, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Update stock
const updateStock = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const product = await productService.updateStock(req.params.id, quantity);
    return successResponse(res, product, 'Stock updated successfully');
  } catch (error) {
    next(error);
  }
};

// Get featured products
const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const products = await productService.getFeaturedProducts(limit);
    return successResponse(res, products, 'Featured products retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Search products
const searchProducts = async (req, res, next) => {
  try {
    const { keyword, ...filters } = req.query;
    const products = await productService.searchProducts(keyword, filters);
    return successResponse(res, products, 'Search completed successfully');
  } catch (error) {
    next(error);
  }
};

// Get products by category
const getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { page, limit, sort } = req.query;
    const options = { page, limit, sort };
    
    const products = await productService.getProductsByCategory(categoryId, options);
    return successResponse(res, products, 'Products by category retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// Add product review
const addReview = async (req, res, next) => {
  try {
    const { rating } = req.body;
    const product = await productService.addReview(req.params.id, rating);
    return successResponse(res, product, 'Review added successfully');
  } catch (error) {
    next(error);
  }
};

// Get product statistics
const getProductStats = async (req, res, next) => {
  try {
    const stats = await productService.getProductStats();
    return successResponse(res, stats, 'Product statistics retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getFeaturedProducts,
  searchProducts,
  getProductsByCategory,
  addReview,
  getProductStats
};