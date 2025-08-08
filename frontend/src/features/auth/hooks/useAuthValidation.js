import { useState } from 'react';

export const useAuthValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) {
      return 'Email là bắt buộc';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email không hợp lệ';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Mật khẩu là bắt buộc';
    }
    if (password.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Mật khẩu phải chứa chữ hoa, chữ thường và số';
    }
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return 'Xác nhận mật khẩu là bắt buộc';
    }
    if (password !== confirmPassword) {
      return 'Mật khẩu không khớp';
    }
    return '';
  };

  const validateFullName = (fullName) => {
    if (!fullName.trim()) {
      return 'Họ tên là bắt buộc';
    }
    if (fullName.trim().length < 2) {
      return 'Họ tên phải có ít nhất 2 ký tự';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (phone && !/^[0-9]{10,11}$/.test(phone)) {
      return 'Số điện thoại không hợp lệ';
    }
    return '';
  };

  const clearError = (fieldName) => {
    setErrors(prev => ({ ...prev, [fieldName]: '' }));
  };

  const setError = (fieldName, message) => {
    setErrors(prev => ({ ...prev, [fieldName]: message }));
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateFullName,
    validatePhone,
    clearError,
    setError,
    clearAllErrors
  };
}; 