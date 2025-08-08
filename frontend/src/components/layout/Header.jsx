import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import { useCart, useAuth } from '../../store/index.jsx';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const userMenuRef = useRef(null);
  const { totalItems } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
    console.log("Tìm kiếm:", query);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            E-Shop
          </Link>
          
          {/* Search Bar - Centered */}
          <div className="flex-1 flex justify-center max-w-2xl mx-8">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Tìm kiếm sản phẩm..."
              debounceMs={300}
              suggestions={['iPhone', 'Samsung', 'Xiaomi', 'MacBook', 'Tai nghe', 'Laptop', 'Camera']}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => isLoggedIn ? setShowUserMenu(!showUserMenu) : null}
                className="p-2 text-gray-600 hover:text-primary transition-colors flex items-center space-x-2"
              >
                {isLoggedIn ? (
                  <>
                    <img 
                      src={user?.avatar} 
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:block text-sm">{user?.name}</span>
                  </>
                ) : (
                  <Link to="/login">
                    <span className="text-xl">👤</span>
                    <span className="hidden md:block text-sm">Đăng nhập</span>
                  </Link>
                )}
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Hồ sơ cá nhân
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Đơn hàng
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="p-2 text-gray-600 hover:text-primary transition-colors relative">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Tìm kiếm sản phẩm..."
            debounceMs={300}
            suggestions={['iPhone', 'Samsung', 'Xiaomi', 'MacBook', 'Tai nghe', 'Laptop', 'Camera']}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
