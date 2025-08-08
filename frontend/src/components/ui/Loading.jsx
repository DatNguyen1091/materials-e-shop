import React from 'react';

const Loading = ({ 
  size = 'md', 
  variant = 'spinner',
  text = 'Đang tải...',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  const renderSpinner = () => (
    <svg className={`animate-spin ${sizes[size]}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  const renderDots = () => (
    <div className="flex space-x-1">
      <div className={`${sizes.sm} bg-current rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${sizes.sm} bg-current rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${sizes.sm} bg-current rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
  
  const renderPulse = () => (
    <div className={`${sizes[size]} bg-current rounded-full animate-pulse`}></div>
  );
  
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="text-primary">
        {renderLoader()}
      </div>
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};

// Loading overlay component
export const LoadingOverlay = ({ children, loading, text = 'Đang tải...' }) => {
  if (!loading) return children;
  
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
        <Loading text={text} />
      </div>
    </div>
  );
};

// Loading skeleton component
export const LoadingSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index} 
          className="h-4 bg-gray-200 rounded mb-2"
          style={{ 
            width: `${Math.random() * 40 + 60}%`,
            marginBottom: index === lines - 1 ? '0' : '0.5rem'
          }}
        ></div>
      ))}
    </div>
  );
};

export default Loading;
