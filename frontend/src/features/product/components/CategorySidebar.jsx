import { useCategories } from '../hooks/useCategories';

export default function CategorySidebar({ selectedCategory, onCategorySelect }) {
  const {
    categories,
    loading,
    error,
    expandedCategories,
    toggleCategory,
    handleCategorySelect,
    clearCategoryFilter
  } = useCategories();

  const handleCategoryClick = (category) => {
    handleCategorySelect(category);
    onCategorySelect(category);
  };

  const handleClearFilter = () => {
    clearCategoryFilter();
    onCategorySelect(null);
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📂</span>
          Danh mục sản phẩm
        </h3>
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📂</span>
          Danh mục sản phẩm
        </h3>
        <div className="text-red-500 text-sm">
          Lỗi tải danh mục: {error}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-blue-500 text-sm hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">📂</span>
        Danh mục sản phẩm
      </h3>
      
      <div className="space-y-2">
        {categories.length === 0 ? (
          <div className="text-gray-500 text-sm">Không có danh mục nào</div>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="border-b border-gray-100 last:border-b-0">
              {/* Parent Category */}
              <div 
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => toggleCategory(category._id)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                </div>
                {category.children && category.children.length > 0 && (
                  <span className={`text-gray-400 transition-transform ${
                    expandedCategories.has(category._id) ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                )}
              </div>
              
              {/* Child Categories */}
              {expandedCategories.has(category._id) && category.children && (
                <div className="ml-6 space-y-1">
                  {category.children.map((child) => (
                    <div
                      key={child._id}
                      className={`flex items-center p-2 rounded cursor-pointer text-sm ${
                        selectedCategory?._id === child._id 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => handleCategoryClick(child)}
                    >
                      <span className="mr-2">{child.icon}</span>
                      {child.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Clear Filter Button */}
      {selectedCategory && (
        <button
          onClick={handleClearFilter}
          className="w-full mt-4 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
        >
          ✕ Xóa bộ lọc
        </button>
      )}
    </div>
  );
} 