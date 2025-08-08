import React from 'react';
import { formatPrice } from '../../product/utils/priceUtils';

export default function CartSummary({ total }) {
  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log('Proceeding to checkout with total:', total);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính:</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="text-green-600">Miễn phí</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Tổng cộng:</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleCheckout}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
      >
        Tiến hành thanh toán
      </button>
    </div>
  );
}
