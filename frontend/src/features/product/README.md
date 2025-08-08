# Category API Integration

## Tổng quan

Frontend đã được tích hợp với Category API từ backend để thay thế dữ liệu mock. Tất cả các chức năng category đều sử dụng API thực từ database.

## API Endpoints

### 1. Get Categories Tree
```javascript
GET /api/category/tree
```
Trả về cấu trúc cây danh mục với parent và children.

### 2. Get All Categories
```javascript
GET /api/category?page=1&limit=10&keyword=search&parentCategoryId=id
```
Trả về danh sách categories với pagination và filters.

### 3. Get Category by ID
```javascript
GET /api/category/:id
```
Trả về thông tin chi tiết của một category.

### 4. Search Categories
```javascript
GET /api/category/search?keyword=search&parentCategoryId=id
```
Tìm kiếm categories theo keyword.

### 5. Get Subcategories
```javascript
GET /api/category/:categoryId/subcategories?page=1&limit=10
```
Trả về subcategories của một category.

### 6. Get Category Statistics
```javascript
GET /api/category/stats
```
Trả về thống kê về categories.

## Hooks

### useCategories
Hook cơ bản để quản lý categories trong sidebar:
```javascript
const {
  categories,
  loading,
  error,
  expandedCategories,
  selectedCategory,
  toggleCategory,
  handleCategorySelect,
  clearCategoryFilter
} = useCategories();
```

### useCategoryManagement
Hook nâng cao cho quản lý categories:
```javascript
const {
  categories,
  loading,
  error,
  pagination,
  fetchCategories,
  searchCategories,
  getCategoryById,
  getSubcategories,
  getCategoryStats
} = useCategoryManagement();
```

## Components

### CategorySidebar
Component hiển thị sidebar danh mục với:
- Loading state
- Error handling
- Expandable categories
- Category selection

### CategoryStats
Component hiển thị thống kê danh mục:
- Tổng số categories
- Số categories cha/con
- Thống kê sản phẩm theo category

## Cách sử dụng

### 1. Import hooks
```javascript
import { useCategories, useCategoryManagement } from '../features/product';
```

### 2. Sử dụng trong component
```javascript
function MyComponent() {
  const { categories, loading, error } = useCategories();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {categories.map(category => (
        <div key={category._id}>{category.name}</div>
      ))}
    </div>
  );
}
```

### 3. Sử dụng CategorySidebar
```javascript
import { CategorySidebar } from '../features/product';

function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  return (
    <div>
      <CategorySidebar 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
    </div>
  );
}
```

## Cấu trúc dữ liệu

### Category Object
```javascript
{
  _id: "string",
  name: "string",
  description: "string",
  icon: "string",
  parentCategoryId: "string" | null,
  isDeleted: boolean,
  createdAt: "date",
  updatedAt: "date",
  children: [Category] // Chỉ có trong tree response
}
```

### Pagination Response
```javascript
{
  data: [Category],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
  }
}
```

## Error Handling

Tất cả API calls đều có error handling:
- Network errors
- HTTP status errors
- Data validation errors

## Loading States

Các components đều có loading states:
- Skeleton loading cho CategorySidebar
- Spinner cho CategoryStats
- Disabled states cho buttons

## Migration từ Mock Data

Đã hoàn thành migration từ mock data sang API thực:
- ✅ useCategories hook sử dụng API
- ✅ CategorySidebar component cập nhật
- ✅ Error handling và loading states
- ✅ Cấu trúc dữ liệu tương thích 