import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Giỏ hàng</h1>
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-500 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
        <Link 
          to="/" 
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
} 