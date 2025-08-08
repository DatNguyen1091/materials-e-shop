import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import { Pagination } from '../../../components';

export default function ProductGrid({ selectedCategory }) {
  const {
    products,
    filteredProducts,
    currentPage,
    totalPages,
    totalProducts,
    loading,
    error,
    handlePageChange,
    refetch
  } = useProducts(selectedCategory);

  // Reset về trang 1 khi thay đổi category được xử lý trong useProducts hook

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Có lỗi xảy ra
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={refetch}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {selectedCategory ? `Sản phẩm ${selectedCategory.name}` : 'Tất cả sản phẩm'}
        </h2>
        <p className="text-gray-600">
          {totalProducts} sản phẩm được tìm thấy
          {totalPages > 1 && ` • Trang ${currentPage} / ${totalPages}`}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showFirstLast={false}
          />
        </div>
      )}

      {/* Empty State */}
      {products.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-gray-600">
            Không có sản phẩm nào trong danh mục này.
          </p>
        </div>
      )}
    </div>
  );
} 