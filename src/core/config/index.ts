/**
 * Configuration Management for OpenOps Studio v3.0
 * Type-safe configuration with Zod validation
 * 
 * @module core/config
 */

import { z } from 'zod';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import { ConfigurationError } from '../errors/AppError';
import { logger } from '../logger';

// Load .env file
dotenvConfig();

/**
 * Environment enum
 */
export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test'
}

/**
 * Configuration schema using Zod
 */
const ConfigSchema = z.object({
  // Application
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
  PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default('3000'),
  HOST: z.string().default('0.0.0.0'),
  
  // Logging
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  
  // Database
  DATABASE_URL: z.string().url().optional(),
  DATABASE_POOL_MIN: z.string().transform(Number).pipe(z.number().min(0)).default('2'),
  DATABASE_POOL_MAX: z.string().transform(Number).pipe(z.number().min(1)).default('10'),
  
  // Redis
  REDIS_URL: z.string().url().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.string().transform(Number).pipe(z.number().min(0).max(15)).default('0'),
  REDIS_KEY_PREFIX: z.string().default('openops:'),
  
  // Neo4j
  NEO4J_URI: z.string().url().optional(),
  NEO4J_USERNAME: z.string().optional(),
  NEO4J_PASSWORD: z.string().optional(),
  
  // Pinecone
  PINECONE_API_KEY: z.string().optional(),
  PINECONE_ENVIRONMENT: z.string().optional(),
  PINECONE_INDEX_NAME: z.string().optional(),
  
  // OpenAI
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_ORG_ID: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4-turbo-preview'),
  
  // Anthropic
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().default('claude-3-sonnet-20240229'),
  
  // AWS
  AWS_REGION: z.string().default('us-east-1'),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_KMS_KEY_ID: z.string().optional(),
  
  // Security
  JWT_SECRET: z.string().min(32).optional(),
  JWT_EXPIRY: z.string().default('24h'),
  ENCRYPTION_KEY: z.string().min(32).optional(),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('60000'), // 1 minute
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  
  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ENVIRONMENT: z.string().optional(),
  SENTRY_TRACES_SAMPLE_RATE: z.string().transform(Number).pipe(z.number().min(0).max(1)).default('0.1'),
  
  // Prometheus
  PROMETHEUS_ENABLED: z.string().transform(v => v === 'true').default('false'),
  PROMETHEUS_PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default('9090'),
  
  // OpenOps Specific
  OPENOPS_MAX_CONCURRENT_AGENTS: z.string().transform(Number).default('10'),
  OPENOPS_ROUND_TIMEOUT_MS: z.string().transform(Number).default('300000'), // 5 minutes
  OPENOPS_ENABLE_HOT_RELOAD: z.string().transform(v => v === 'true').default('true'),
  OPENOPS_ENABLE_AUDIT: z.string().transform(v => v === 'true').default('true'),
  
  // CORS
  CORS_ORIGIN: z.string().default('*'),
  CORS_CREDENTIALS: z.string().transform(v => v === 'true').default('true')
});

/**
 * Configuration type
 */
export type Config = z.infer<typeof ConfigSchema>;

/**
 * Parse and validate configuration
 */
function parseConfig(): Config {
  try {
    const parsed = ConfigSchema.parse(process.env);
    logger.info('Configuration loaded and validated successfully');
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new ConfigurationError(
        'Configuration validation failed',
        { issues }
      );
    }
    throw error;
  }
}

/**
 * Validated configuration object
 */
export const config = parseConfig();

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return config.NODE_ENV === Environment.PRODUCTION;
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return config.NODE_ENV === Environment.DEVELOPMENT;
}

/**
 * Check if running in test
 */
export function isTest(): boolean {
  return config.NODE_ENV === Environment.TEST;
}

/**
 * Get configuration value by key (type-safe)
 */
export function getConfig<K extends keyof Config>(key: K): Config[K] {
  return config[key];
}

/**
 * Validate required configurations for specific features
 */
export function validateRequiredConfigs(required: (keyof Config)[]): void {
  const missing: string[] = [];
  
  for (const key of required) {
    const value = config[key];
    if (value === undefined || value === null || value === '') {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    throw new ConfigurationError(
      `Missing required configuration: ${missing.join(', ')}`,
      { missing }
    );
  }
}

/**
 * Mask sensitive values for logging
 */
export function getMaskedConfig(): Record<string, unknown> {
  const sensitiveKeys = [
    'OPENAI_API_KEY',
    'ANTHROPIC_API_KEY',
    'JWT_SECRET',
    'ENCRYPTION_KEY',
    'DATABASE_URL',
    'REDIS_PASSWORD',
    'NEO4J_PASSWORD',
    'AWS_SECRET_ACCESS_KEY',
    'SENTRY_DSN'
  ];
  
  const masked: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(config)) {
    if (sensitiveKeys.includes(key) && value) {
      masked[key] = '***MASKED***';
    } else {
      masked[key] = value;
    }
  }
  
  return masked;
}

/**
 * Export configuration utilities
 */
export const configUtils = {
  isProduction,
  isDevelopment,
  isTest,
  getConfig,
  validateRequiredConfigs,
  getMaskedConfig
};

export default config;
