// Cart Utility Functions

export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    const price = item.discount > 0 
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return total + (price * item.quantity);
  }, 0);
};

export const calculateTotalItems = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const getItemById = (items, id) => {
  return items.find(item => item.id === id);
};

export const isItemInCart = (items, id) => {
  return items.some(item => item.id === id);
};

export const getCartItemCount = (items) => {
  return items.length;
};

export const getUniqueItemsCount = (items) => {
  return new Set(items.map(item => item.id)).size;
};

export const calculateShippingCost = (total, threshold = 500000) => {
  return total >= threshold ? 0 : 30000; // Free shipping over 500k VND
};

export const calculateFinalTotal = (items) => {
  const subtotal = calculateCartTotal(items);
  const shipping = calculateShippingCost(subtotal);
  return subtotal + shipping;
}; 