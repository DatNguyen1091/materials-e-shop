// Auth Validation Utils

export const validateEmail = (email) => {
  if (!email) {
    return 'Email là bắt buộc';
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Email không hợp lệ';
  }
  return '';
};

export const validatePassword = (password) => {
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

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Xác nhận mật khẩu là bắt buộc';
  }
  if (password !== confirmPassword) {
    return 'Mật khẩu không khớp';
  }
  return '';
};

export const validateFullName = (fullName) => {
  if (!fullName.trim()) {
    return 'Họ tên là bắt buộc';
  }
  if (fullName.trim().length < 2) {
    return 'Họ tên phải có ít nhất 2 ký tự';
  }
  return '';
};

export const validatePhone = (phone) => {
  if (phone && !/^[0-9]{10,11}$/.test(phone)) {
    return 'Số điện thoại không hợp lệ';
  }
  return '';
};

export const validateLoginForm = (formData) => {
  const errors = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateRegisterForm = (formData) => {
  const errors = {};
  
  const fullNameError = validateFullName(formData.fullName);
  if (fullNameError) errors.fullName = fullNameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
  }
  
  return errors;
}; 