import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Đăng ký tài khoản</h2>
          <p className="mt-2 text-sm text-gray-600">
            Hoặc{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              đăng nhập nếu đã có tài khoản
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />
      </div>
      </div>
    </AuthLayout>
  );
} 