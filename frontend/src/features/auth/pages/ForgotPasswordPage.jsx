import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Vui lòng nhập email của bạn');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không hợp lệ');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Mock API call - trong thực tế sẽ gọi API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Email đã được gửi</h2>
            <p className="mt-2 text-sm text-gray-600">
              Chúng tôi đã gửi link đặt lại mật khẩu đến <strong>{email}</strong>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Vui lòng kiểm tra email và làm theo hướng dẫn để đặt lại mật khẩu.
              </p>
              <p className="text-sm text-gray-600">
                Nếu không nhận được email, hãy kiểm tra thư mục spam hoặc{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  thử lại
                </button>
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  ← Quay lại đăng nhập
                </Link>
              </div>
                      </div>
        </div>
      </div>
      </div>
    </AuthLayout>
  );
}

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Quên mật khẩu</h2>
          <p className="mt-2 text-sm text-gray-600">
            Nhập email của bạn để nhận link đặt lại mật khẩu
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Nhập email của bạn"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Đang gửi...' : 'Gửi link đặt lại mật khẩu'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-dark"
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
      </div>
    </AuthLayout>
  );
} 