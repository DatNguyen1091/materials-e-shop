# Hệ thống Authentication

## Tổng quan

Hệ thống authentication được xây dựng theo kiến trúc feature-based với các trang riêng biệt thay vì modal popup.

## Cấu trúc thư mục

```
src/pages/auth/
├── LoginPage.jsx           # Trang đăng nhập
├── RegisterPage.jsx        # Trang đăng ký
├── ForgotPasswordPage.jsx  # Trang quên mật khẩu
└── README.md              # Tài liệu này
```

## Các tính năng

### 🔐 Đăng nhập (`/login`)
- **Form đăng nhập** với email/password
- **Social login**: Google, Facebook
- **Remember me**: Ghi nhớ đăng nhập
- **Validation**: Kiểm tra email và mật khẩu
- **Loading state**: Hiển thị trạng thái đang xử lý
- **Error handling**: Xử lý lỗi đăng nhập
- **Navigation**: Chuyển hướng đến trang chủ sau khi đăng nhập

### 📝 Đăng ký (`/register`)
- **Form đăng ký** với đầy đủ thông tin:
  - Họ và tên
  - Email
  - Số điện thoại (tùy chọn)
  - Mật khẩu
  - Xác nhận mật khẩu
- **Social registration**: Google, Facebook
- **Validation**: Kiểm tra tất cả trường bắt buộc
- **Password strength**: Yêu cầu mật khẩu mạnh
- **Terms agreement**: Đồng ý điều khoản sử dụng
- **Auto login**: Tự động đăng nhập sau khi đăng ký thành công

### 🔑 Quên mật khẩu (`/forgot-password`)
- **Form gửi email** để đặt lại mật khẩu
- **Email validation**: Kiểm tra email hợp lệ
- **Success state**: Hiển thị thông báo đã gửi email
- **Retry option**: Cho phép thử lại nếu không nhận được email

## Layout

### AuthLayout
- **Header**: Logo E-Shop và navigation
- **Main content**: Form authentication
- **Footer**: Links đến điều khoản, chính sách, liên hệ
- **Responsive**: Hoạt động tốt trên mobile/desktop

## State Management

### Store Context
```javascript
// Auth state
const auth = {
  isLoggedIn: boolean,
  user: {
    id: number,
    name: string,
    email: string,
    avatar: string,
    phone?: string
  },
  login: (userData) => void,
  logout: () => void,
  updateUser: (userData) => void
}
```

## Routing

### Routes
```javascript
// Auth routes (không sử dụng MainLayout)
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
```

## UI/UX Features

### Design System
- **Primary color**: #007AFF (blue)
- **Error color**: #EF4444 (red)
- **Success color**: #10B981 (green)
- **Typography**: Tailwind CSS classes
- **Spacing**: Consistent padding/margin

### Components
- **Form inputs**: Styled với focus states
- **Buttons**: Primary, secondary variants
- **Loading spinners**: SVG animations
- **Error messages**: Red background với border
- **Success messages**: Green background với icon

### Responsive Design
- **Mobile-first**: Thiết kế cho mobile trước
- **Breakpoints**: sm, md, lg, xl
- **Flexible layouts**: Grid và Flexbox
- **Touch-friendly**: Buttons và inputs đủ lớn

## Validation Rules

### Email
- Bắt buộc
- Format hợp lệ: `user@domain.com`

### Password
- Tối thiểu 6 ký tự
- Chứa chữ hoa, chữ thường và số
- Xác nhận mật khẩu phải khớp

### Full Name
- Bắt buộc
- Tối thiểu 2 ký tự

### Phone Number
- Tùy chọn
- Format: 10-11 chữ số

## Security Features

### Client-side
- **Input sanitization**: Loại bỏ ký tự nguy hiểm
- **Password strength**: Kiểm tra độ mạnh mật khẩu
- **Form validation**: Kiểm tra trước khi submit

### Future Enhancements
- **JWT tokens**: Authentication tokens
- **Refresh tokens**: Auto-renewal
- **Rate limiting**: Giới hạn số lần thử đăng nhập
- **2FA**: Two-factor authentication
- **OAuth 2.0**: Social login integration

## Mock Implementation

### Current State
- **Mock API calls**: Simulate network requests
- **Local state**: Store user data in memory
- **Auto login**: Tự động đăng nhập sau đăng ký

### Production Ready
- **Real API integration**: Connect to backend
- **Persistent storage**: localStorage/sessionStorage
- **Token management**: JWT handling
- **Error handling**: Network error handling

## Usage Examples

### Login Flow
1. User click "Đăng nhập" trên header
2. Navigate to `/login`
3. Fill form và submit
4. Success → redirect to `/`
5. Error → show error message

### Registration Flow
1. User click "Đăng ký" trên login page
2. Navigate to `/register`
3. Fill form và submit
4. Success → auto login → redirect to `/`
5. Error → show error message

### Password Reset Flow
1. User click "Quên mật khẩu" trên login page
2. Navigate to `/forgot-password`
3. Enter email và submit
4. Success → show confirmation message
5. User check email for reset link

## Testing

### Manual Testing
- [ ] Login với email/password hợp lệ
- [ ] Login với thông tin không hợp lệ
- [ ] Register với đầy đủ thông tin
- [ ] Register với thông tin thiếu/sai
- [ ] Forgot password flow
- [ ] Social login buttons (mock)
- [ ] Responsive design trên mobile
- [ ] Navigation giữa các trang

### Future Testing
- [ ] Unit tests cho components
- [ ] Integration tests cho forms
- [ ] E2E tests cho user flows
- [ ] Accessibility testing
- [ ] Performance testing 