import React, { useState } from 'react';
import {
  Button,
  Input,
  Loading,
  LoadingSkeleton,
  Modal,
  ConfirmModal,
  SearchBar,
  Pagination,
  SimplePagination,
  Breadcrumb,
  BreadcrumbWithDropdown
} from './index';

const ComponentShowcase = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const handleConfirm = () => {
    console.log('Confirmed!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Component Showcase</h1>

      {/* Button Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Buttons</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            leftIcon="📧"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon="🔒"
            error="Password is required"
          />
          <Input
            label="Search"
            placeholder="Search..."
            leftIcon="🔍"
            rightIcon="⌨️"
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="Enter phone number"
            leftIcon="📞"
          />
        </div>
      </section>

      {/* Loading Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Loading variant="spinner" size="lg" text="Loading..." />
          </div>
          <div className="text-center">
            <Loading variant="dots" size="lg" text="Processing..." />
          </div>
          <div className="text-center">
            <Loading variant="pulse" size="lg" text="Please wait..." />
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <LoadingSkeleton lines={4} />
        </div>
      </section>

      {/* Modal Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Modals</h2>
        <div className="flex space-x-4">
          <Button onClick={() => setShowModal(true)}>
            Open Modal
          </Button>
          <Button variant="danger" onClick={() => setShowConfirmModal(true)}>
            Show Confirm Modal
          </Button>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Sample Modal"
          size="lg"
        >
          <p className="text-gray-600 mb-4">
            This is a sample modal content. You can put any content here.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowModal(false)}>
              Confirm
            </Button>
          </div>
        </Modal>

        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
          title="Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      </section>

      {/* SearchBar Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Search Bar</h2>
        <div className="max-w-md">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search products..."
            suggestions={['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'MacBook']}
          />
        </div>
        <p className="text-sm text-gray-600">
          Search query: {searchQuery || 'None'}
        </p>
      </section>

      {/* Pagination Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Pagination</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Full Pagination</h3>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              showFirstLast={true}
              maxVisiblePages={5}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Simple Pagination</h3>
            <SimplePagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Breadcrumbs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Basic Breadcrumb</h3>
            <Breadcrumb
              items={[
                { label: 'Sản phẩm', path: '/products', icon: '📱' },
                { label: 'Điện thoại', path: '/products/phones', icon: '📞' },
                { label: 'iPhone 15 Pro Max', path: null }
              ]}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Breadcrumb with Dropdown</h3>
            <BreadcrumbWithDropdown
              items={[
                { label: 'Trang chủ', path: '/', icon: '🏠' },
                { label: 'Sản phẩm', path: '/products', icon: '📱' },
                { label: 'Điện thoại', path: '/products/phones', icon: '📞' },
                { label: 'Apple', path: '/products/phones/apple', icon: '🍎' },
                { label: 'iPhone', path: '/products/phones/apple/iphone', icon: '📱' },
                { label: 'iPhone 15 Pro Max', path: null }
              ]}
              maxVisibleItems={3}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentShowcase; 