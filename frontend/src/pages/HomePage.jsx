import { useState } from 'react';
import CategorySidebar from '../features/product/components/CategorySidebar';
import ProductGrid from '../features/product/components/ProductGrid';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary to-secondary text-white rounded-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">E-Shop - Thiết bị điện tử</h1>
        <p className="text-lg md:text-xl mb-6">Khám phá các thiết bị điện tử chất lượng với giá tốt nhất</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors">
            Khám phá ngay
          </button>
          <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors">
            Xem khuyến mãi
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
          <div className="text-2xl md:text-3xl mb-2 md:mb-4">🚚</div>
          <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Giao hàng nhanh</h3>
          <p className="text-xs md:text-sm text-gray-600">Giao hàng trong 24h tại Hà Nội</p>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
          <div className="text-2xl md:text-3xl mb-2 md:mb-4">💰</div>
          <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Giá tốt nhất</h3>
          <p className="text-xs md:text-sm text-gray-600">Cam kết giá tốt nhất thị trường</p>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
          <div className="text-2xl md:text-3xl mb-2 md:mb-4">🛡️</div>
          <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Bảo hành chính hãng</h3>
          <p className="text-xs md:text-sm text-gray-600">Bảo hành 12 tháng chính hãng</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
          <div className="text-2xl md:text-3xl mb-2 md:mb-4">🔄</div>
          <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Đổi trả dễ dàng</h3>
          <p className="text-xs md:text-sm text-gray-600">Đổi trả trong 30 ngày</p>
        </div>
      </section>
      
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
        >
          <span className="font-medium">📂 Lọc theo danh mục</span>
          <span className={`transition-transform ${showSidebar ? 'rotate-180' : ''}`}>▼</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className={`lg:w-80 lg:flex-shrink-0 ${showSidebar ? 'block' : 'hidden lg:block'}`}>
          <CategorySidebar 
            selectedCategory={selectedCategory}
            onCategorySelect={(category) => {
              setSelectedCategory(category);
              setShowSidebar(false); // Close sidebar on mobile after selection
            }}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}
