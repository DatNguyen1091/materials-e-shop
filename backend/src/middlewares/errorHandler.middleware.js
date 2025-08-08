const logger = require('../utils/logger');
const { errorResponse } = require('../utils/response');
const { 
  AppError, 
  ValidationError, 
  AuthenticationError, 
  AuthorizationError, 
  NotFoundError, 
  ConflictError, 
  DatabaseError 
} = require('../utils/errors');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id
  });

  // Handle custom AppError instances
  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode, {
      errors: err.errors,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Handle Mongoose errors
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new NotFoundError(message);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    error = new ConflictError(message);
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));
    error = new ValidationError('Validation failed', errors);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AuthenticationError('Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    error = new AuthenticationError('Token expired');
  }

  // Handle database connection errors
  if (err.name === 'MongoNetworkError' || err.name === 'MongoServerSelectionError') {
    error = new DatabaseError('Database connection failed');
  }

  // Handle syntax errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = new ValidationError('Invalid JSON format');
  }

  // Default error
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  return errorResponse(res, message, statusCode, {
    errors: error.errors,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};

/**
 * 404 Not Found middleware
 */
const notFound = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

/**
 * Async error wrapper
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler
}; 