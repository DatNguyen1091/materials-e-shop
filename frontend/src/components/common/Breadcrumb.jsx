import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ 
  items = [], 
  separator = '/',
  className = '',
  maxItems = 5,
  showHome = true 
}) => {
  if (items.length === 0) return null;

  // Add home item if needed
  const allItems = showHome 
    ? [{ label: 'Trang chủ', path: '/', icon: '🏠' }, ...items]
    : items;

  // Limit items if needed
  const visibleItems = allItems.slice(-maxItems);

  const renderItem = (item, index, isLast) => {
    const isActive = isLast;
    
    const itemContent = (
      <span className={`flex items-center ${isActive ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-primary transition-colors'}`}>
        {item.icon && <span className="mr-1">{item.icon}</span>}
        {item.label}
      </span>
    );

    if (isActive || !item.path) {
      return (
        <span key={index} className="flex items-center">
          {itemContent}
        </span>
      );
    }

    return (
      <Link key={index} to={item.path} className="flex items-center">
        {itemContent}
      </Link>
    );
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {visibleItems.map((item, index) => (
        <React.Fragment key={index}>
          {renderItem(item, index, index === visibleItems.length - 1)}
          {index < visibleItems.length - 1 && (
            <span className="text-gray-400">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Breadcrumb with dropdown for long paths
export const BreadcrumbWithDropdown = ({ 
  items = [], 
  maxVisibleItems = 3,
  className = '' 
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  if (items.length <= maxVisibleItems) {
    return <Breadcrumb items={items} className={className} />;
  }

  const hiddenItems = items.slice(0, -maxVisibleItems + 1);
  const visibleItems = items.slice(-maxVisibleItems + 1);

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {/* Dropdown for hidden items */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <span>⋯</span>
        </button>
        
        {showDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
            {hiddenItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <span className="text-gray-400">/</span>

      {/* Visible items */}
      {visibleItems.map((item, index) => (
        <React.Fragment key={index}>
          <Link
            to={item.path}
            className={`flex items-center ${
              index === visibleItems.length - 1 
                ? 'text-gray-800 font-medium' 
                : 'text-gray-600 hover:text-primary transition-colors'
            }`}
          >
            {item.icon && <span className="mr-1">{item.icon}</span>}
            {item.label}
          </Link>
          {index < visibleItems.length - 1 && (
            <span className="text-gray-400">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Auto-generated breadcrumb from current path
export const AutoBreadcrumb = ({ 
  pathname,
  pathMap = {},
  className = '' 
}) => {
  const generateItems = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const items = [];
    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Use pathMap if available, otherwise format the segment
      const label = pathMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      items.push({
        label,
        path: currentPath
      });
    });

    return items;
  };

  return <Breadcrumb items={generateItems()} className={className} />;
};

export default Breadcrumb;
