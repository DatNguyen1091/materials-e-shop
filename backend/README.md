# Node.js E-Shop API

A production-ready Node.js REST API for an e-shop application with comprehensive features including authentication, authorization, real-time messaging, and more.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Real-time Communication**: Socket.IO integration for live messaging
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: Swagger/OpenAPI documentation
- **Security**: Helmet, CORS, Rate limiting, Input validation
- **Logging**: Winston logger with file rotation
- **Error Handling**: Centralized error handling with custom error classes
- **Testing**: Jest unit testing framework
- **Health Checks**: Comprehensive health monitoring endpoints
- **Production Ready**: Environment-based configuration, graceful shutdown

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BE_E_Shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/e-shop
   JWT_SECRET=your-super-secret-jwt-key
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   LOG_LEVEL=info
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 API Documentation

Once the server is running, you can access the API documentation at:
- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/api/health`

## 🏗️ Project Structure

```
src/
├── config/                 # Configuration files
│   ├── database.js        # Database connection
│   └── swagger.js         # Swagger configuration
├── constants/             # Application constants
│   ├── permissions.constants.js
│   └── role.constants.js
├── controllers/           # Route controllers
├── dtos/                  # Data Transfer Objects
├── enum/                  # Enumerations
├── middlewares/           # Express middlewares
│   ├── authenticateToken.middleware.js
│   ├── authorize.middleware.js
│   ├── errorHandler.middleware.js
│   ├── rateLimit.middleware.js
│   └── validation.middleware.js
├── models/                # Mongoose models
├── routes/                # API routes
├── services/              # Business logic
├── socket/                # Socket.IO handlers
├── utils/                 # Utility functions
│   ├── logger.js          # Winston logger
│   └── response.js        # Response utilities
└── __tests__/             # Test files
    ├── setup.js
    ├── middlewares/
    └── utils/
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Joi schema validation
- **Password Hashing**: bcrypt for password security
- **JWT**: Secure token-based authentication

## 📊 Health Monitoring

### Health Check Endpoints

- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Detailed system information
- `GET /api/health/ready` - Readiness check for load balancers

### Response Format

```json
{
  "success": true,
  "message": "Service is healthy",
  "data": {
    "status": "OK",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 123.456,
    "database": "connected",
    "environment": "development"
  }
}
```

## 🔄 API Response Format

All API responses follow a standardized format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 📝 Logging

The application uses Winston for logging with the following features:

- **File Rotation**: Automatic log file rotation
- **Multiple Levels**: Error, warn, info, debug
- **Structured Logging**: JSON format for production
- **Console Output**: Colored output for development

Log files are stored in the `logs/` directory:
- `error.log` - Error level logs only
- `combined.log` - All log levels

## 🚀 Production Deployment

### Environment Variables

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-production-jwt-secret
ALLOWED_ORIGINS=https://yourdomain.com
LOG_LEVEL=error
```

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### PM2 Configuration

```json
{
  "name": "e-shop-api",
  "script": "src/index.js",
  "instances": "max",
  "exec_mode": "cluster",
  "env": {
    "NODE_ENV": "production"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team. 