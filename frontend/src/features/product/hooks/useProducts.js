import { useState, useEffect } from 'react';
import { getProducts, getProductsByCategory } from '../services/productApi';
import { mapApiProductsToProducts } from '../utils/productMapper';

export const useProducts = (selectedCategory = null) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Match API limit
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate total pages from API response
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Fetch products from API
  const fetchProducts = async (page = 1, category = null) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: productsPerPage,
        sortOrder: 'desc'
      };

      let response;
      if (category?.name) {
        response = await getProductsByCategory(category.name, params);
      } else {
        response = await getProducts(params);
      }

      // Handle the API response structure and map to frontend format
      if (response.data && Array.isArray(response.data)) {
        const mappedProducts = mapApiProductsToProducts(response.data);
        setProducts(mappedProducts);
        setTotalProducts(response.total || 0);
      } else {
        setProducts([]);
        setTotalProducts(0);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page, selectedCategory);
    // Scroll to top khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
    fetchProducts(1, selectedCategory);
  };

  // Fetch products when component mounts or category changes
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1, selectedCategory);
  }, [selectedCategory]);

  return {
    products,
    filteredProducts: products, // For backward compatibility
    currentPage,
    totalPages,
    productsPerPage,
    totalProducts,
    loading,
    error,
    handlePageChange,
    resetToFirstPage,
    refetch: () => fetchProducts(currentPage, selectedCategory)
  };
};
