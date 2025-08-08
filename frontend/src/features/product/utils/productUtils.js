import { products } from '../data/products';

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (categoryName) => {
  return products.filter(product => product.category === categoryName);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getProductCategories = () => {
  const categories = [...new Set(products.map(product => product.category))];
  return categories;
};

export const getProductsWithDiscount = () => {
  return products.filter(product => product.discount > 0);
};

export const getTopRatedProducts = (limit = 5) => {
  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getNewestProducts = (limit = 5) => {
  return products
    .sort((a, b) => b.id - a.id)
    .slice(0, limit);
};

export const getProductsInPriceRange = (minPrice, maxPrice) => {
  return products.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};
