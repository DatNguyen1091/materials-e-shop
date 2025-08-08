import { useCart as useStoreCart } from '../../../store/index.jsx';

export const useCart = () => {
  const cart = useStoreCart();
  
  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = item.discount > 0 
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemById = (id) => {
    return cart.items.find(item => item.id === id);
  };

  const isItemInCart = (id) => {
    return cart.items.some(item => item.id === id);
  };

  return {
    ...cart,
    calculateTotal,
    calculateTotalItems,
    getItemById,
    isItemInCart
  };
};
