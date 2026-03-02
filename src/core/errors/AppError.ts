/**
 * Custom Application Error Classes for OpenOps Studio v3.0
 * Provides structured error handling with proper HTTP status codes
 * 
 * @module core/errors
 */

/**
 * Base Application Error
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string,
    metadata?: Record<string, unknown>
  ) {
    super(message);
    
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.metadata = metadata;
    
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
    
    // Set the prototype explicitly
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        metadata: this.metadata,
        ...(process.env.NODE_ENV === 'development' && {
          stack: this.stack
        })
      }
    };
  }
}

/**
 * Bad Request Error (400)
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request', metadata?: Record<string, unknown>) {
    super(message, 400, true, 'BAD_REQUEST', metadata);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * Unauthorized Error (401)
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', metadata?: Record<string, unknown>) {
    super(message, 401, true, 'UNAUTHORIZED', metadata);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * Forbidden Error (403)
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', metadata?: Record<string, unknown>) {
    super(message, 403, true, 'FORBIDDEN', metadata);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * Not Found Error (404)
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', metadata?: Record<string, unknown>) {
    super(message, 404, true, 'NOT_FOUND', metadata);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Conflict Error (409)
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict', metadata?: Record<string, unknown>) {
    super(message, 409, true, 'CONFLICT', metadata);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * Validation Error (422)
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', metadata?: Record<string, unknown>) {
    super(message, 422, true, 'VALIDATION_ERROR', metadata);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Rate Limit Error (429)
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests', metadata?: Record<string, unknown>) {
    super(message, 429, true, 'RATE_LIMIT_EXCEEDED', metadata);
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

/**
 * Internal Server Error (500)
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error', metadata?: Record<string, unknown>) {
    super(message, 500, true, 'INTERNAL_SERVER_ERROR', metadata);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

/**
 * Service Unavailable Error (503)
 */
export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service temporarily unavailable', metadata?: Record<string, unknown>) {
    super(message, 503, true, 'SERVICE_UNAVAILABLE', metadata);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

/**
 * Agent Error - specific to agent operations
 */
export class AgentError extends AppError {
  constructor(
    agentId: string,
    message: string,
    metadata?: Record<string, unknown>
  ) {
    super(
      `Agent ${agentId}: ${message}`,
      500,
      true,
      'AGENT_ERROR',
      { agentId, ...metadata }
    );
    Object.setPrototypeOf(this, AgentError.prototype);
  }
}

/**
 * Configuration Error - invalid configuration
 */
export class ConfigurationError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 500, false, 'CONFIGURATION_ERROR', metadata);
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}

/**
 * External Service Error - third-party service failures
 */
export class ExternalServiceError extends AppError {
  constructor(
    serviceName: string,
    message: string,
    metadata?: Record<string, unknown>
  ) {
    super(
      `External service ${serviceName}: ${message}`,
      502,
      true,
      'EXTERNAL_SERVICE_ERROR',
      { serviceName, ...metadata }
    );
    Object.setPrototypeOf(this, ExternalServiceError.prototype);
  }
}

/**
 * Database Error - database operation failures
 */
export class DatabaseError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, 500, true, 'DATABASE_ERROR', metadata);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

/**
 * Check if an error is operational (safe to expose to clients)
 */
export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

/**
 * Error handler export
 */
export const ErrorHandler = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  RateLimitError,
  InternalServerError,
  ServiceUnavailableError,
  AgentError,
  ConfigurationError,
  ExternalServiceError,
  DatabaseError,
  isOperationalError
};

export default ErrorHandler;
