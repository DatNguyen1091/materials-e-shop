export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

export const calculateDiscountedPrice = (price, discount) => {
  return price * (1 - discount / 100);
};

export const formatDiscountedPrice = (price, discount) => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  return formatPrice(discountedPrice);
};

export const getDiscountAmount = (price, discount) => {
  return price - calculateDiscountedPrice(price, discount);
};

export const formatDiscountAmount = (price, discount) => {
  const discountAmount = getDiscountAmount(price, discount);
  return formatPrice(discountAmount);
};
