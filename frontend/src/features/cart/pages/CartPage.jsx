import React from 'react';
import { useCart } from '../../../store/index.jsx';
import { formatPrice, calculateDiscountedPrice } from '../../product/utils/priceUtils';
import CartItemList from '../components/CartItemList';
import CartSummary from '../components/CartSummary';
import EmptyCart from '../components/EmptyCart';

export default function CartPage() {
  const { items, totalItems, removeFromCart, updateCartQuantity } = useCart();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = item.discount > 0 
        ? calculateDiscountedPrice(item.price, item.discount)
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  if (totalItems === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Giỏ hàng ({totalItems} sản phẩm)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <CartItemList 
            items={items}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
          />
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary total={calculateTotal()} />
        </div>
      </div>
    </div>
  );
}
