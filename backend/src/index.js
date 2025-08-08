require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import configurations
const { connectDB } = require('./config/database');
const setupSwagger = require('./config/swagger');

// Import middlewares
const { errorHandler, notFound } = require('./middlewares/errorHandler.middleware');
const { generalLimiter, apiLimiter, createUserLimiter } = require('./middlewares/rateLimit.middleware');

// Import routes
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');
const messageRoutes = require('./routes/message.routes');
const roleRoutes = require('./routes/role.routes');
const permissionRoutes = require('./routes/permission.routes');

// Import utilities
const logger = require('./utils/logger');
const initializeSocket = require('./socket/socketHandler');

// Create Express app
const app = express();
const server = http.createServer(app);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGIONS ? process.env.ALLOWED_ORIGIONS.split(',') : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Logging middleware
app.use(morgan('combined', { stream: logger.stream }));

// Rate limiting
app.use(generalLimiter);
app.use('/api', apiLimiter);

// Swagger documentation
setupSwagger(app);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes with rate limiting
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Initialize Socket.IO
const io = initializeSocket(server);

// Make io available to routes
app.set('io', io);

// Start server function
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    const PORT = process.env.PORT || 3000;
    
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Start the server
startServer();

module.exports = app; 