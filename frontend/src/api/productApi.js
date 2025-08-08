import { baseApi } from './baseApi';

export const productApi = {
  // Get products with pagination and sorting
  getProducts: async (params = {}) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortOrder = 'desc',
        category = null,
        search = null
      } = params;

      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortOrder
      });

      // Add optional parameters
      if (category) {
        searchParams.append('category', category);
      }
      if (search) {
        searchParams.append('search', search);
      }

      const response = await fetch(`${baseApi.BASE_URL}/products?${searchParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Return the actual data structure from the API
      if (result.success && result.data) {
        return {
          data: result.data.data || [],
          pagination: result.data.pagination || {},
          total: result.data.pagination?.total || 0,
          totalPages: result.data.pagination?.totalPages || 0,
          currentPage: result.data.pagination?.page || 1,
          hasNextPage: result.data.pagination?.hasNextPage || false,
          hasPrevPage: result.data.pagination?.hasPrevPage || false
        };
      }
      
      return {
        data: [],
        pagination: {},
        total: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${baseApi.BASE_URL}/products/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Return the product data from the API response
      if (result.success && result.data) {
        return result.data;
      }
      
      throw new Error('Product not found');
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};
