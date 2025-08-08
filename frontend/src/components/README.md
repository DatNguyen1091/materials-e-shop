# Components Library

Thư viện các components chung có thể tái sử dụng trong toàn bộ ứng dụng.

## 📁 Cấu trúc thư mục

```
src/components/
├── ui/              # UI Components cơ bản
│   ├── Button.jsx       # Button với nhiều variants
│   ├── Input.jsx        # Input với validation
│   ├── Loading.jsx      # Loading states
│   └── Modal.jsx        # Modal dialogs
├── common/          # Common Components
│   ├── SearchBar.jsx    # Search với suggestions
│   ├── Pagination.jsx   # Pagination controls
│   └── Breadcrumb.jsx   # Navigation breadcrumbs
├── layout/          # Layout Components
│   ├── Header.jsx       # Header component
│   ├── Footer.jsx       # Footer component
│   └── Sidebar.jsx      # Sidebar component
└── index.js         # Barrel exports
```

## 🎯 UI Components

### Button
```javascript
import { Button } from '../components';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `disabled`: boolean
- `loading`: boolean
- `fullWidth`: boolean

### Input
```javascript
import { Input } from '../components';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  leftIcon="📧"
  error="Invalid email"
/>
```

**Props:**
- `label`: string
- `error`: string
- `leftIcon`: string | ReactNode
- `rightIcon`: string | ReactNode

### Loading
```javascript
import { Loading, LoadingOverlay, LoadingSkeleton } from '../components';

<Loading variant="spinner" size="md" text="Đang tải..." />
<LoadingOverlay loading={isLoading}>Content</LoadingOverlay>
<LoadingSkeleton lines={3} />
```

**Variants:**
- `spinner`: Spinning circle
- `dots`: Bouncing dots
- `pulse`: Pulsing circle

### Modal
```javascript
import { Modal, ConfirmModal } from '../components';

<Modal isOpen={isOpen} onClose={onClose} title="Modal Title">
  Content here
</Modal>

<ConfirmModal
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={handleConfirm}
  message="Are you sure?"
/>
```

## 🔍 Common Components

### SearchBar
```javascript
import { SearchBar, SearchBarWithHistory } from '../components';

<SearchBar
  onSearch={handleSearch}
  placeholder="Tìm kiếm sản phẩm..."
  debounceMs={300}
  suggestions={['iPhone', 'Samsung', 'Xiaomi']}
/>

<SearchBarWithHistory
  onSearch={handleSearch}
  maxHistoryItems={5}
/>
```

### Pagination
```javascript
import { Pagination, SimplePagination, PaginationWithSelector } from '../components';

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  showFirstLast={true}
  maxVisiblePages={5}
/>

<SimplePagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>

<PaginationWithSelector
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  onPageChange={handlePageChange}
  onItemsPerPageChange={handleItemsPerPageChange}
/>
```

### Breadcrumb
```javascript
import { Breadcrumb, BreadcrumbWithDropdown, AutoBreadcrumb } from '../components';

<Breadcrumb
  items={[
    { label: 'Trang chủ', path: '/', icon: '🏠' },
    { label: 'Sản phẩm', path: '/products', icon: '📱' },
    { label: 'iPhone', path: null }
  ]}
/>

<AutoBreadcrumb
  pathname={location.pathname}
  pathMap={{
    '/products': 'Sản phẩm',
    '/cart': 'Giỏ hàng'
  }}
/>
```

## 🎨 Styling

Tất cả components sử dụng Tailwind CSS với design system nhất quán:

### Colors
- `primary`: #1e40af (Blue)
- `secondary`: #f43f5e (Rose)
- `success`: #16a34a (Green)
- `danger`: #dc2626 (Red)
- `warning`: #ca8a04 (Yellow)

### Sizes
- `sm`: Small (12px-16px)
- `md`: Medium (14px-18px)
- `lg`: Large (16px-20px)
- `xl`: Extra Large (18px-24px)

### Spacing
- Consistent spacing với Tailwind scale
- Responsive design cho mobile/desktop

## 🔧 Usage Examples

### Form với validation
```javascript
import { Input, Button, Loading } from '../components';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        error={errors.email}
        leftIcon="📧"
        required
      />
      <Input
        label="Password"
        type="password"
        error={errors.password}
        leftIcon="🔒"
        required
      />
      <Button
        type="submit"
        loading={loading}
        fullWidth
        className="mt-4"
      >
        Đăng nhập
      </Button>
    </form>
  );
};
```

### Product List với Search và Pagination
```javascript
import { SearchBar, Pagination, LoadingSkeleton } from '../components';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (query) => {
    // Search logic
  };

  if (loading) {
    return <LoadingSkeleton lines={6} />;
  }

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Tìm kiếm sản phẩm..."
        className="mb-6"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
};
```

### Modal với Confirmation
```javascript
import { Modal, ConfirmModal, Button } from '../components';

const ProductActions = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    // Delete logic
  };

  return (
    <div>
      <Button
        variant="danger"
        onClick={() => setShowDeleteModal(true)}
      >
        Xóa sản phẩm
      </Button>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này?"
        confirmText="Xóa"
        cancelText="Hủy"
        variant="danger"
      />
    </div>
  );
};
```

## 🚀 Best Practices

### 1. Consistent Naming
- Sử dụng PascalCase cho component names
- Sử dụng camelCase cho props
- Sử dụng kebab-case cho CSS classes

### 2. Props Design
- Luôn có default values cho optional props
- Sử dụng prop spreading cho HTML attributes
- Validate props với PropTypes hoặc TypeScript

### 3. Accessibility
- Sử dụng semantic HTML
- Thêm ARIA labels khi cần
- Keyboard navigation support
- Screen reader friendly

### 4. Performance
- Memoize expensive components
- Lazy load khi cần
- Optimize re-renders

### 5. Testing
- Unit tests cho logic
- Integration tests cho user flows
- Visual regression tests

## 📈 Future Enhancements

### Planned Features
- [ ] Dark mode support
- [ ] Animation library integration
- [ ] Form validation library
- [ ] Date picker component
- [ ] File upload component
- [ ] Data table component
- [ ] Chart components
- [ ] Notification system

### Performance Improvements
- [ ] Bundle size optimization
- [ ] Tree shaking support
- [ ] Code splitting
- [ ] Lazy loading

### Developer Experience
- [ ] Storybook integration
- [ ] Component documentation
- [ ] TypeScript support
- [ ] Design tokens system 