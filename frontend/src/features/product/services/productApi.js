import { productApi } from '../../../api/productApi';
import { categoryApi } from '../../../api/categoryApi';

// Re-export the main product API functions
export const { getProducts, getProductById } = productApi;
export const { getCategoriesTree } = categoryApi;

// Additional product-specific utility functions can be added here
export const searchProducts = async (searchTerm, options = {}) => {
  return await productApi.getProducts({
    ...options,
    search: searchTerm
  });
};

export const getProductsByCategory = async (category, options = {}) => {
  return await productApi.getProducts({
    ...options,
    category
  });
};

export const getCategoriesByTree = async () => {
  return await categoryApi.getCategoriesTree();
};

