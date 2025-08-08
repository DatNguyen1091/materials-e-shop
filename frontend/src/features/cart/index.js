// Cart Feature - Barrel Exports

// Pages
export { default as CartPage } from './pages/CartPage';

// Components
export { default as CartItemList } from './components/CartItemList';
export { default as CartItem } from './components/CartItem';
export { default as CartSummary } from './components/CartSummary';
export { default as EmptyCart } from './components/EmptyCart';

// Hooks
export { useCart } from './hooks/useCart';

// Utils
export { 
  calculateCartTotal,
  calculateTotalItems,
  getItemById,
  isItemInCart,
  getCartItemCount,
  getUniqueItemsCount,
  calculateShippingCost,
  calculateFinalTotal
} from './utils/cartUtils'; 