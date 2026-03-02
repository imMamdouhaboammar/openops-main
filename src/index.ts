/**
 * OpenOps Studio v3.0 - Main Entry Point
 * 
 * @module index
 */

import { logger } from './core/logger';
import { config, getMaskedConfig } from './core/config';
import { initializeErrorHandlers } from './core/errors/errorMiddleware';
import { OpenOpsRuntime } from './core/runtime/OpenOpsRuntime';
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';

/**
 * Initialize Express application
 */
function createApp(): Express {
  const app = express();
  
  // Security middleware
  app.use(helmet());
  
  // CORS
  app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: config.CORS_CREDENTIALS
  }));
  
  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // Compression
  app.use(compression());
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    max: config.RATE_LIMIT_MAX_REQUESTS,
    message: 'Too many requests from this IP, please try again later'
  });
  app.use('/api', limiter);
  
  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });
  
  // Readiness check endpoint
  app.get('/ready', (_req, res) => {
    const runtime = app.get('runtime') as OpenOpsRuntime;
    const isReady = runtime && runtime.getState() === 'READY';
    
    res.status(isReady ? 200 : 503).json({
      ready: isReady,
      state: runtime?.getState()
    });
  });
  
  // Metrics endpoint (if Prometheus enabled)
  if (config.PROMETHEUS_ENABLED) {
    app.get('/metrics', (_req, res) => {
      const runtime = app.get('runtime') as OpenOpsRuntime;
      res.json(runtime?.getMetrics() || {});
    });
  }
  
  return app;
}

/**
 * Bootstrap the application
 */
async function bootstrap(): Promise<void> {
  try {
    logger.info('Starting OpenOps Studio v3.0...');
    logger.info('Environment:', config.NODE_ENV);
    logger.debug('Configuration:', getMaskedConfig());
    
    // Create Express app
    const app = createApp();
    
    // Initialize OpenOps Runtime
    const runtime = new OpenOpsRuntime();
    app.set('runtime', runtime);
    
    // Boot the runtime
    await runtime.boot();
    
    // Start HTTP server
    const server = app.listen(config.PORT, config.HOST, () => {
      logger.info(`🚀 Server listening on ${config.HOST}:${config.PORT}`);
    });
    
    // Initialize error handlers
    initializeErrorHandlers(server);
    
    // Register runtime shutdown handler
    runtime.registerShutdownHandler(async () => {
      logger.info('Closing HTTP server...');
      return new Promise((resolve) => {
        server.close(() => {
          logger.info('HTTP server closed');
          resolve();
        });
      });
    });
    
    // Handle runtime events
    runtime.on('error', (error) => {
      logger.error({ err: error }, 'Runtime error occurred');
      process.exit(1);
    });
    
    runtime.on('stateChange', ({ oldState, newState }) => {
      logger.debug(`Runtime state changed: ${oldState} → ${newState}`);
    });
    
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to bootstrap application');
    process.exit(1);
  }
}

// Start the application
bootstrap().catch((error) => {
  logger.fatal({ err: error }, 'Unhandled error during bootstrap');
  process.exit(1);
});

// Export for testing
export { createApp, bootstrap };
