import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import { Pagination } from '../../../components';

export default function ProductGrid({ selectedCategory }) {
  const {
    products,
    filteredProducts,
    currentPage,
    totalPages,
    handlePageChange
  } = useProducts(selectedCategory);

  // Reset về trang 1 khi thay đổi category được xử lý trong useProducts hook

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {selectedCategory ? `Sản phẩm ${selectedCategory.name}` : 'Tất cả sản phẩm'}
        </h2>
        <p className="text-gray-600">
          {filteredProducts.length} sản phẩm được tìm thấy
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
      {filteredProducts.length === 0 && (
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