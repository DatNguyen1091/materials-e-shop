// Auth Feature - Barrel Exports

// Pages
export { default as LoginPage } from './pages/LoginPage';
export { default as RegisterPage } from './pages/RegisterPage';
export { default as ForgotPasswordPage } from './pages/ForgotPasswordPage';

// Components
export { default as LoginForm } from './components/LoginForm';
export { default as RegisterForm } from './components/RegisterForm';

// Hooks
export { useAuthValidation } from './hooks/useAuthValidation';

// Services (if any)
// export { authService } from './services/authService';

// Utils
export { 
  validateEmail, 
  validatePassword, 
  validateConfirmPassword,
  validateFullName,
  validatePhone,
  validateLoginForm,
  validateRegisterForm
} from './utils/validation'; 