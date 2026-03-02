/**
 * Security Middleware for OpenOps Studio v3.0
 * Authentication, Authorization, and Security utilities
 * 
 * @module security/middleware
 */

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '@core/config';
import { logger, logSecurityEvent } from '@core/logger';
import { UnauthorizedError, ForbiddenError } from '@core/errors/AppError';

/**
 * JWT Payload interface
 */
export interface JWTPayload {
  userId: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

/**
 * Authenticated Request interface
 */
export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

/**
 * Verify JWT token middleware
 */
export function verifyToken(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);

    // Verify token
    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as JWTPayload;
    
    // Attach user to request
    req.user = decoded;
    
    logger.debug({ userId: decoded.userId }, 'Token verified');
    next();
    
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      logSecurityEvent({
        type: 'INVALID_TOKEN',
        severity: 'medium',
        message: 'Invalid JWT token',
        metadata: { ip: req.ip, url: req.url }
      });
      
      next(new UnauthorizedError('Invalid token'));
    } else if (error instanceof jwt.TokenExpiredError) {
      logSecurityEvent({
        type: 'EXPIRED_TOKEN',
        severity: 'low',
        message: 'Expired JWT token',
        metadata: { ip: req.ip, url: req.url }
      });
      
      next(new UnauthorizedError('Token expired'));
    } else {
      next(error);
    }
  }
}

/**
 * Check if user has required roles
 */
export function requireRoles(...requiredRoles: string[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('User not authenticated');
      }

      const userRoles = req.user.roles || [];
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

      if (!hasRequiredRole) {
        logSecurityEvent({
          type: 'INSUFFICIENT_PERMISSIONS',
          severity: 'medium',
          message: 'User lacks required permissions',
          metadata: {
            userId: req.user.userId,
            userRoles,
            requiredRoles,
            url: req.url
          }
        });
        
        throw new ForbiddenError('Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Generate JWT token
 */
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY
  });
}

/**
 * API Key authentication middleware
 */
export function verifyApiKey(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      throw new UnauthorizedError('API key required');
    }

    // TODO: Implement API key validation
    // For now, just check if it's not empty
    if (typeof apiKey !== 'string' || apiKey.length === 0) {
      throw new UnauthorizedError('Invalid API key');
    }

    logger.debug({ apiKey: '***' }, 'API key verified');
    next();
    
  } catch (error) {
    next(error);
  }
}

/**
 * Request ID middleware - adds unique ID to each request
 */
export function requestId(req: Request, _res: Response, next: NextFunction): void {
  const id = req.headers['x-request-id'] as string || crypto.randomUUID();
  (req as any).id = id;
  next();
}

/**
 * Request logging middleware
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  
  // Log request
  logger.info({
    type: 'request',
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    requestId: (req as any).id
  }, 'Incoming request');

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    
    logger[level]({
      type: 'response',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      requestId: (req as any).id
    }, 'Response sent');
  });

  next();
}

/**
 * Sanitize input middleware - removes potentially dangerous characters
 */
export function sanitizeInput(req: Request, _res: Response, next: NextFunction): void {
  const sanitize = (obj: any): any => {
    if (typeof obj === 'string') {
      // Remove script tags and other dangerous content
      return obj
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitize(value);
      }
      return sanitized;
    }
    
    return obj;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  
  next();
}

/**
 * IP whitelist middleware
 */
export function ipWhitelist(allowedIps: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const clientIp = req.ip;
    
    if (!clientIp || !allowedIps.includes(clientIp)) {
      logSecurityEvent({
        type: 'IP_NOT_WHITELISTED',
        severity: 'high',
        message: 'Request from non-whitelisted IP',
        metadata: { ip: clientIp, url: req.url }
      });
      
      next(new ForbiddenError('Access denied'));
      return;
    }
    
    next();
  };
}

export default {
  verifyToken,
  requireRoles,
  generateToken,
  verifyApiKey,
  requestId,
  requestLogger,
  sanitizeInput,
  ipWhitelist
};
