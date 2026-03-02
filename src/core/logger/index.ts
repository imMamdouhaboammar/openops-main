/**
 * Centralized Logger System for OpenOps Studio v3.0
 * Built on Pino for high-performance structured logging
 * 
 * @module core/logger
 */

import pino from 'pino';
import type { Logger, LoggerOptions } from 'pino';

/**
 * Log levels mapping
 */
export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

/**
 * Logger configuration interface
 */
export interface LoggerConfig {
  level?: LogLevel;
  prettyPrint?: boolean;
  serviceName?: string;
  version?: string;
}

/**
 * Create a configured logger instance
 */
export function createLogger(config: LoggerConfig = {}): Logger {
  const {
    level = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO,
    prettyPrint = process.env.NODE_ENV === 'development',
    serviceName = 'openops-studio',
    version = '3.0.0'
  } = config;

  const options: LoggerOptions = {
    level,
    base: {
      service: serviceName,
      version,
      env: process.env.NODE_ENV || 'development'
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label }),
      bindings: (bindings) => ({
        pid: bindings.pid,
        hostname: bindings.hostname
      })
    }
  };

  // Add pretty printing in development
  if (prettyPrint) {
    return pino({
      ...options,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
          ignore: 'pid,hostname',
          singleLine: false,
          messageFormat: '{levelLabel} - {msg}'
        }
      }
    });
  }

  return pino(options);
}

/**
 * Default logger instance
 */
export const logger = createLogger();

/**
 * Create a child logger with additional context
 */
export function createChildLogger(context: Record<string, unknown>): Logger {
  return logger.child(context);
}

/**
 * Log request information
 */
export function logRequest(req: {
  method: string;
  url: string;
  headers: Record<string, unknown>;
  ip?: string;
}): void {
  logger.info({
    type: 'request',
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  }, 'Incoming request');
}

/**
 * Log response information
 */
export function logResponse(res: {
  statusCode: number;
  duration: number;
}): void {
  const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
  logger[level]({
    type: 'response',
    statusCode: res.statusCode,
    duration: `${res.duration}ms`
  }, 'Response sent');
}

/**
 * Log agent activity
 */
export function logAgentActivity(activity: {
  agentId: string;
  action: string;
  round?: string;
  metadata?: Record<string, unknown>;
}): void {
  logger.info({
    type: 'agent_activity',
    ...activity
  }, `Agent ${activity.agentId} - ${activity.action}`);
}

/**
 * Log security event
 */
export function logSecurityEvent(event: {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metadata?: Record<string, unknown>;
}): void {
  const level = event.severity === 'critical' || event.severity === 'high' ? 'error' : 'warn';
  logger[level]({
    type: 'security_event',
    ...event
  }, event.message);
}

/**
 * Log performance metric
 */
export function logPerformance(metric: {
  operation: string;
  duration: number;
  metadata?: Record<string, unknown>;
}): void {
  logger.info({
    type: 'performance',
    ...metric
  }, `Performance: ${metric.operation} took ${metric.duration}ms`);
}

export default logger;
