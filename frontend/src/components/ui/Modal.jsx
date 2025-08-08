import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  className = '' 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={handleBackdropClick}
        />
        
        {/* Modal */}
        <div className={`relative bg-white rounded-lg shadow-xl w-full ${sizes[size]} ${className}`}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
  
  return createPortal(modalContent, document.body);
};

// Modal Footer component
export const ModalFooter = ({ children, className = '' }) => {
  return (
    <div className={`flex justify-end space-x-3 pt-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Confirm Modal component
export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Xác nhận', 
  message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  variant = 'danger'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        <p className="text-gray-600 mb-6">{message}</p>
        
        <ModalFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${
              variant === 'danger' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {confirmText}
          </button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default Modal;
