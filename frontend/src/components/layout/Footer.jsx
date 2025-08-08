import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">E-Shop</h3>
            <p className="text-gray-300">
              Thiết bị điện tử chất lượng cao với giá tốt nhất
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Danh mục</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Điện thoại & Máy tính bảng</li>
              <li>Laptop & Máy tính</li>
              <li>Âm thanh & Giải trí</li>
              <li>Thiết bị gia dụng</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Liên hệ</li>
              <li>Hướng dẫn mua hàng</li>
              <li>Chính sách bảo hành</li>
              <li>Đổi trả</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Theo dõi</h4>
            <div className="flex space-x-4">
              <span className="text-2xl cursor-pointer hover:text-primary transition-colors">📘</span>
              <span className="text-2xl cursor-pointer hover:text-primary transition-colors">📷</span>
              <span className="text-2xl cursor-pointer hover:text-primary transition-colors">🐦</span>
              <span className="text-2xl cursor-pointer hover:text-primary transition-colors">📺</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>© 2025 E-Shop. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
