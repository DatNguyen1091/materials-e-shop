import { useParams, Link } from "react-router-dom";
import { useProductDetail } from '../hooks/useProductDetail';
import { formatPrice, calculateDiscountedPrice } from '../utils/priceUtils';
import { Breadcrumb } from '../../../components';

export default function ProductDetail() {
  const { id } = useParams();
  const {
    product,
    selectedImage,
    quantity,
    selectedColor,
    handleImageChange,
    handleQuantityChange,
    handleColorChange
  } = useProductDetail(id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😕</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Không tìm thấy sản phẩm
        </h3>
        <p className="text-gray-600 mb-4">
          Sản phẩm bạn đang tìm kiếm không tồn tại.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: product.category, path: '/', icon: '📱' },
            { label: product.name, path: null }
          ]}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="mb-4">
            <img 
              src={product.images ? product.images[selectedImage] : product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.discount > 0 ? (
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-red-600">
                  {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  -{product.discount}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-800">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Color Selection */}
          {product.colors && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Màu sắc</h3>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(index)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      selectedColor === index 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Số lượng</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="text-lg font-semibold w-16 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button className="flex-1 bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold">
              Thêm vào giỏ hàng
            </button>
            <button className="px-6 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
              ❤️ Yêu thích
            </button>
          </div>

          {/* Specifications */}
          {product.specs && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông số kỹ thuật</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
