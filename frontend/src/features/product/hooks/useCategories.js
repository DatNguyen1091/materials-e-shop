import { useState } from 'react';
import { categories } from '../data/categories';

export const useCategories = () => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  return {
    categories,
    expandedCategories,
    selectedCategory,
    toggleCategory,
    handleCategorySelect,
    clearCategoryFilter
  };
};
