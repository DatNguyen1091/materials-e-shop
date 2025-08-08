import React, { useState, useEffect, useRef } from 'react';
import Input from '../ui/Input';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Tìm kiếm...',
  debounceMs = 300,
  suggestions = [],
  onSuggestionSelect,
  className = '',
  showSuggestions = true,
  ...props 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Debounce search
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, onSearch, debounceMs]);

  useEffect(() => {
    // Filter suggestions based on query
    if (query.trim() && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestionsList(showSuggestions && filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestionsList(false);
    }
  }, [query, suggestions, showSuggestions]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestionsList(false);
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestionsList(false);
      if (query.trim()) {
        onSearch(query.trim());
      }
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        leftIcon="🔍"
        {...props}
      />
      
      {/* Suggestions Dropdown */}
      {showSuggestionsList && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// SearchBar with recent searches
export const SearchBarWithHistory = ({ 
  onSearch, 
  maxHistoryItems = 5,
  storageKey = 'search-history',
  ...props 
}) => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, [storageKey]);

  const addToHistory = (query) => {
    const newHistory = [query, ...recentSearches.filter(item => item !== query)]
      .slice(0, maxHistoryItems);
    
    setRecentSearches(newHistory);
    localStorage.setItem(storageKey, JSON.stringify(newHistory));
  };

  const handleSearch = (query) => {
    addToHistory(query);
    onSearch(query);
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <SearchBar
      onSearch={handleSearch}
      suggestions={recentSearches}
      {...props}
    />
  );
};

export default SearchBar;
