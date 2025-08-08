// Hooks
export { useProducts } from './hooks/useProducts';
export { useCategories } from './hooks/useCategories';
export { useProductDetail } from './hooks/useProductDetail';

// Utils
export * from './utils/priceUtils';
export * from './utils/productUtils';

// Data
export { products } from './data/products';
export { categories } from './data/categories';

// Components
export { default as ProductCard } from './components/ProductCard';
export { default as ProductGrid } from './components/ProductGrid';
export { default as CategorySidebar } from './components/CategorySidebar';

// Pages
export { default as ProductDetail } from './pages/ProductDetail'; 