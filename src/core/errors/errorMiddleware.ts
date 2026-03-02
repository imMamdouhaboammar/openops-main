/**
 * Express Error Handling Middleware for OpenOps Studio v3.0
 * Centralized error handling with proper logging and response formatting
 * 
 * @module core/errors/middleware
 */

import type { Request, Response, NextFunction } from 'express';
import { AppError, isOperationalError } from './AppError';
import { logger, logSecurityEvent } from '../logger';

/**
 * Error response interface
 */
interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    statusCode: number;
    metadata?: Record<string, unknown>;
    stack?: string;
    timestamp: string;
    path: string;
    requestId?: string;
  };
}

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Log the error
  logger.error({
    err,
    req: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    }
  }, 'Request error');

  // Log security events for certain errors
  if (err instanceof AppError && [401, 403].includes(err.statusCode)) {
    logSecurityEvent({
      type: err.code || 'SECURITY_ERROR',
      severity: 'medium',
      message: err.message,
      metadata: {
        url: req.url,
        method: req.method,
        ip: req.ip
      }
    });
  }

  // Handle AppError instances
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      error: {
        message: err.message,
        code: err.code,
        statusCode: err.statusCode,
        metadata: err.metadata,
        timestamp: new Date().toISOString(),
        path: req.path,
        requestId: (req as any).id
      }
    };

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      response.error.stack = err.stack;
    }

    res.status(err.statusCode).json(response);
    return;
  }

  // Handle unexpected errors
  const statusCode = 500;
  const response: ErrorResponse = {
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message,
      code: 'INTERNAL_SERVER_ERROR',
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
      requestId: (req as any).id
    }
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

/**
 * Async error handler wrapper
 * Wraps async route handlers to catch errors automatically
 */
export function asyncHandler<T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Not found handler - catches 404 errors
 */
export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const error = new AppError(
    `Route not found: ${req.method} ${req.path}`,
    404,
    true,
    'NOT_FOUND',
    {
      method: req.method,
      path: req.path
    }
  );
  next(error);
}

/**
 * Uncaught exception handler
 */
export function handleUncaughtException(): void {
  process.on('uncaughtException', (error: Error) => {
    logger.fatal({ err: error }, 'Uncaught exception detected');
    
    if (!isOperationalError(error)) {
      logger.fatal('Non-operational error detected, shutting down...');
      process.exit(1);
    }
  });
}

/**
 * Unhandled rejection handler
 */
export function handleUnhandledRejection(): void {
  process.on('unhandledRejection', (reason: unknown) => {
    logger.fatal({ reason }, 'Unhandled promise rejection detected');
    
    // Convert to Error if not already
    const error = reason instanceof Error ? reason : new Error(String(reason));
    
    if (!isOperationalError(error)) {
      logger.fatal('Non-operational error detected, shutting down...');
      process.exit(1);
    }
  });
}

/**
 * Graceful shutdown handler
 */
export function handleGracefulShutdown(server: any): void {
  const shutdown = (signal: string) => {
    logger.info(`${signal} received, starting graceful shutdown...`);
    
    server.close(() => {
      logger.info('Server closed, exiting process');
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Forcefully shutting down after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

/**
 * Initialize all error handlers
 */
export function initializeErrorHandlers(server?: any): void {
  handleUncaughtException();
  handleUnhandledRejection();
  
  if (server) {
    handleGracefulShutdown(server);
  }
}

export default {
  errorHandler,
  asyncHandler,
  notFoundHandler,
  initializeErrorHandlers
};
