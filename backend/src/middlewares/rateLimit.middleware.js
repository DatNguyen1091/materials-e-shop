const rateLimit = require('express-rate-limit');

// General rate limiter
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
        timestamp: new Date().toISOString()
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Auth rate limiter (more strict)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.',
        timestamp: new Date().toISOString()
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// API rate limiter (moderate)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: {
        success: false,
        message: 'Too many API requests from this IP, please try again later.',
        timestamp: new Date().toISOString()
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Create user rate limiter
const createUserLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 user creation requests per hour
    message: {
        success: false,
        message: 'Too many user creation attempts, please try again later.',
        timestamp: new Date().toISOString()
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    generalLimiter,
    authLimiter,
    apiLimiter,
    createUserLimiter
}; 