# Product Feature

Cấu trúc feature-based cho quản lý sản phẩm và danh mục.

## 📁 Cấu trúc thư mục

```
src/features/product/
├── components/          # UI Components
│   ├── ProductCard.jsx      # Card hiển thị sản phẩm
│   ├── ProductGrid.jsx      # Grid hiển thị danh sách sản phẩm
│   ├── CategorySidebar.jsx  # Sidebar lọc theo danh mục
│   ├── ProductGallery.jsx   # Gallery ảnh sản phẩm (TODO)
│   ├── ProductSort.jsx      # Component sắp xếp (TODO)
│   └── ProductFilter.jsx    # Component lọc nâng cao (TODO)
├── data/               # Data sources
│   ├── products.js         # Mock data sản phẩm
│   └── categories.js       # Mock data danh mục
├── hooks/              # Custom hooks
│   ├── useProducts.js      # Hook quản lý sản phẩm
│   ├── useCategories.js    # Hook quản lý danh mục
│   └── useProductDetail.js # Hook chi tiết sản phẩm
├── pages/              # Page components
│   ├── ProductDetail.jsx   # Trang chi tiết sản phẩm
│   ├── ProductListPage.jsx # Trang danh sách sản phẩm (TODO)
│   └── CategoryPage.jsx    # Trang danh mục (TODO)
├── services/           # API services (TODO)
├── utils/              # Utility functions
│   ├── priceUtils.js       # Xử lý giá cả
│   └── productUtils.js     # Xử lý sản phẩm
└── index.js            # Barrel exports
```

## 🎯 Tính năng

### ✅ Đã hoàn thành
- **Product Management**: Hiển thị danh sách sản phẩm với phân trang
- **Category Filtering**: Lọc sản phẩm theo danh mục
- **Product Detail**: Trang chi tiết sản phẩm với gallery ảnh
- **Price Formatting**: Định dạng giá tiền VND
- **Discount Calculation**: Tính toán giá khuyến mãi
- **Responsive Design**: Thiết kế responsive với Tailwind CSS

### 🚧 Đang phát triển
- **Product Search**: Tìm kiếm sản phẩm
- **Advanced Filtering**: Lọc theo giá, đánh giá, thương hiệu
- **Product Sorting**: Sắp xếp theo giá, tên, đánh giá
- **API Integration**: Kết nối với backend API
- **State Management**: Quản lý state toàn cục

## 🔧 Sử dụng

### Import components
```javascript
import { ProductCard, ProductGrid, CategorySidebar } from '../features/product';
```

### Import hooks
```javascript
import { useProducts, useCategories, useProductDetail } from '../features/product';
```

### Import utils
```javascript
import { formatPrice, searchProducts } from '../features/product';
```

## 📊 Data Structure

### Product
```javascript
{
  id: number,
  name: string,
  price: number,
  image: string,
  category: string,
  rating: number,
  discount: number,
  description: string,
  specs: object,
  colors: string[],
  images: string[]
}
```

### Category
```javascript
{
  id: number,
  name: string,
  icon: string,
  children: Category[]
}
```

## 🎨 Styling

Sử dụng Tailwind CSS với custom colors:
- `primary`: #1e40af (Blue)
- `secondary`: #f43f5e (Rose)

## 🔄 State Management

### Local State
- Sử dụng React hooks (useState, useEffect, useMemo)
- State được quản lý trong từng component

### Future Plans
- Tích hợp Redux Toolkit hoặc Zustand
- Global state cho cart, user preferences
- Caching với React Query

## 🚀 Performance

- **Lazy Loading**: Components được load khi cần
- **Memoization**: useMemo cho expensive calculations
- **Pagination**: Chỉ load 20 sản phẩm mỗi trang
- **Image Optimization**: Placeholder images cho development

## 🧪 Testing

### TODO
- Unit tests cho hooks
- Component tests với React Testing Library
- Integration tests cho product flow
- E2E tests với Playwright

## 📈 Scalability

Cấu trúc được thiết kế để dễ dàng mở rộng:
- **Feature-based**: Mỗi feature độc lập
- **Modular**: Components có thể tái sử dụng
- **Extensible**: Dễ dàng thêm tính năng mới
- **Maintainable**: Code được tổ chức rõ ràng 