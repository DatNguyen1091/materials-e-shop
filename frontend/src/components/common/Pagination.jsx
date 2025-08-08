import React from 'react';
import Button from '../ui/Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showPageNumbers = true,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = '',
  size = 'md'
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageButton = (page, isActive = false) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`px-3 py-2 border rounded-lg transition-colors ${
        isActive
          ? 'bg-primary text-white border-primary'
          : 'border-gray-300 hover:bg-gray-50'
      }`}
      disabled={isActive}
    >
      {page}
    </button>
  );

  const renderEllipsis = (key) => (
    <span key={key} className="px-3 py-2 text-gray-500">
      ...
    </span>
  );

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="outline"
          size={size}
          onClick={() => handlePageChange(1)}
          className="px-2"
        >
          «
        </Button>
      )}

      {/* Previous Page */}
      {showPrevNext && (
        <Button
          variant="outline"
          size={size}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2"
        >
          ‹
        </Button>
      )}

      {/* Page Numbers */}
      {showPageNumbers && (
        <>
          {/* Show ellipsis at start if needed */}
          {visiblePages[0] > 1 && renderEllipsis('start-ellipsis')}
          
          {/* Page numbers */}
          {visiblePages.map(page => renderPageButton(page, page === currentPage))}
          
          {/* Show ellipsis at end if needed */}
          {visiblePages[visiblePages.length - 1] < totalPages && renderEllipsis('end-ellipsis')}
        </>
      )}

      {/* Next Page */}
      {showPrevNext && (
        <Button
          variant="outline"
          size={size}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2"
        >
          ›
        </Button>
      )}

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="outline"
          size={size}
          onClick={() => handlePageChange(totalPages)}
          className="px-2"
        >
          »
        </Button>
      )}
    </div>
  );
};

// Simple Pagination (just prev/next)
export const SimplePagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = '',
  prevText = 'Trước',
  nextText = 'Sau'
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← {prevText}
      </Button>
      
      <span className="text-sm text-gray-600">
        Trang {currentPage} / {totalPages}
      </span>
      
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {nextText} →
      </Button>
    </div>
  );
};

// Pagination with items per page selector
export const PaginationWithSelector = ({ 
  currentPage, 
  totalPages, 
  totalItems,
  itemsPerPage,
  onPageChange, 
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
  className = '' 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 ${className}`}>
      {/* Items info */}
      <div className="text-sm text-gray-600">
        Hiển thị {startItem}-{endItem} trong tổng số {totalItems} kết quả
      </div>

      {/* Items per page selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Hiển thị:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {itemsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Pagination;
