import { useState, useMemo, useEffect } from 'react';
import { products } from '../data/products';

export const useProducts = (selectedCategory = null) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  // Lọc sản phẩm theo category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory.name);
  }, [selectedCategory]);

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  // Reset về trang 1 khi thay đổi category
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return {
    products: currentProducts,
    filteredProducts,
    currentPage,
    totalPages,
    productsPerPage,
    handlePageChange,
    resetToFirstPage
  };
};
