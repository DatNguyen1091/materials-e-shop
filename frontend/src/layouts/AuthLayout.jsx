import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-xl font-bold text-primary">
              E-Shop
            </Link>
            <nav className="flex space-x-8">
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Trang chủ
              </Link>
              <Link 
                to="/login" 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register" 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Đăng ký
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2025 E-Shop. Tất cả quyền được bảo lưu.</p>
            <div className="mt-2 space-x-4">
              <Link to="/terms" className="hover:text-gray-700">Điều khoản sử dụng</Link>
              <Link to="/privacy" className="hover:text-gray-700">Chính sách bảo mật</Link>
              <Link to="/contact" className="hover:text-gray-700">Liên hệ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
