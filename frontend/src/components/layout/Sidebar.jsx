import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen = false, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:shadow-none
      `}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            <Link 
              to="/" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <span className="mr-3">🏠</span>
              Trang chủ
            </Link>
            
            <Link 
              to="/products" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <span className="mr-3">📱</span>
              Sản phẩm
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <span className="mr-3">🛒</span>
              Giỏ hàng
            </Link>
            
            <Link 
              to="/orders" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <span className="mr-3">📋</span>
              Đơn hàng
            </Link>
            
            <Link 
              to="/profile" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <span className="mr-3">👤</span>
              Tài khoản
            </Link>
          </nav>
          
          {/* Categories */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Danh mục</h3>
            <div className="space-y-1">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                📱 Điện thoại
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                💻 Laptop
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                🎧 Tai nghe
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                📺 Tivi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
