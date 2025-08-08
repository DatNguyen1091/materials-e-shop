import React from 'react';
import CartItem from './CartItem';

export default function CartItemList({ items, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
} 