import { useCategories } from '../hooks/useCategories';

export default function CategorySidebar({ selectedCategory, onCategorySelect }) {
  const {
    categories,
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">📂</span>
        Danh mục sản phẩm
      </h3>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-100 last:border-b-0">
            {/* Parent Category */}
            <div 
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
              </div>
              <span className={`text-gray-400 transition-transform ${
                expandedCategories.has(category.id) ? 'rotate-180' : ''
              }`}>
                ▼
              </span>
            </div>
            
            {/* Child Categories */}
            {expandedCategories.has(category.id) && (
              <div className="ml-6 space-y-1">
                {category.children.map((child) => (
                  <div
                    key={child.id}
                    className={`flex items-center p-2 rounded cursor-pointer text-sm ${
                      selectedCategory?.id === child.id 
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
        ))}
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