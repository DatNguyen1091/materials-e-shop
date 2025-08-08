const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Basic health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                     uptime:
 *                       type: number
 *                     version:
 *                       type: string
 */
router.get('/', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  };

  return successResponse(res, healthData, 'Service is healthy');
});

/**
 * @swagger
 * /api/health/detailed:
 *   get:
 *     summary: Detailed health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Detailed health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                     uptime:
 *                       type: number
 *                     version:
 *                       type: string
 *                     environment:
 *                       type: string
 *                     database:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                         connection:
 *                           type: string
 *                     memory:
 *                       type: object
 *                       properties:
 *                         used:
 *                           type: number
 *                         total:
 *                           type: number
 *                         percentage:
 *                           type: number
 */
router.get('/detailed', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    const detailedData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStatus,
        connection: mongoose.connection.host || 'N/A'
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        percentage: Math.round((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100)
      }
    };

    return successResponse(res, detailedData, 'Detailed health check completed');
  } catch (error) {
    logger.error('Health check error:', error);
    return errorResponse(res, 'Health check failed', 500);
  }
});

/**
 * @swagger
 * /api/health/ready:
 *   get:
 *     summary: Readiness check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready
 *       503:
 *         description: Service is not ready
 */
router.get('/ready', async (req, res) => {
  try {
    // Check if database is connected
    if (process.env.NODE_ENV === 'development' && mongoose.connection.readyState !== 1) {
      const readinessData = {
        status: 'ready',
        timestamp: new Date().toISOString(),
        database: 'disconnected (development mode)',
        service: 'ready'
      };
      return successResponse(res, readinessData, 'Service is ready (development mode)');
    }

    if (mongoose.connection.readyState !== 1) {
      return errorResponse(res, 'Database not ready', 503);
    }

    const readinessData = {
      status: 'ready',
      timestamp: new Date().toISOString(),
      database: 'connected',
      service: 'ready'
    };

    return successResponse(res, readinessData, 'Service is ready');
  } catch (error) {
    logger.error('Readiness check error:', error);
    return errorResponse(res, 'Service not ready', 503);
  }
});

/**
 * @swagger
 * /api/health/live:
 *   get:
 *     summary: Liveness check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive
 */
router.get('/live', (req, res) => {
  const livenessData = {
    status: 'alive',
    timestamp: new Date().toISOString(),
    pid: process.pid
  };

  return successResponse(res, livenessData, 'Service is alive');
});

module.exports = router; 