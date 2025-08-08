import React from 'react';
import { formatPrice, calculateDiscountedPrice } from '../../product/utils/priceUtils';

export default function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 last:border-b-0">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="px-3 py-1 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Xóa
            </button>
          </div>
          
          <div className="text-right">
            {item.discount > 0 ? (
              <div>
                <p className="font-semibold text-primary">
                  {formatPrice(calculateDiscountedPrice(item.price, item.discount) * item.quantity)}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ) : (
              <p className="font-semibold text-gray-800">
                {formatPrice(item.price * item.quantity)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
