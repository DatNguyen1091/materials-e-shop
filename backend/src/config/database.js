require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check if MONGODB_URI is provided and valid
        if (!process.env.MONGODB_URI || process.env.MONGODB_URI.trim() === '') {
            console.warn('MONGODB_URI not provided or empty, skipping database connection for development');
            return null;
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            bufferCommands: false
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        
        // In development, don't exit if MongoDB is not available
        if (process.env.NODE_ENV === 'development') {
            console.warn('Continuing without database connection in development mode');
            return null;
        }
        
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log('MongoDB disconnected');
        }
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};

module.exports = { connectDB, disconnectDB }; 