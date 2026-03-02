/**
 * Redis Cache Manager for OpenOps Studio v3.0
 * High-performance caching with Redis
 * 
 * @module infrastructure/cache
 */

import { createClient, RedisClientType } from 'redis';
import { logger } from '@core/logger';
import { config } from '@core/config';
import { DatabaseError } from '@core/errors/AppError';

/**
 * Cache configuration
 */
export interface CacheConfig {
  url?: string;
  password?: string;
  db?: number;
  keyPrefix?: string;
  ttl?: number; // default TTL in seconds
}

/**
 * Redis Cache Manager
 */
export class CacheManager {
  private client: RedisClientType | null = null;
  private config: CacheConfig;
  private isConnected: boolean = false;

  constructor(cacheConfig?: Partial<CacheConfig>) {
    this.config = {
      url: cacheConfig?.url || config.REDIS_URL,
      password: cacheConfig?.password || config.REDIS_PASSWORD,
      db: cacheConfig?.db || config.REDIS_DB,
      keyPrefix: cacheConfig?.keyPrefix || config.REDIS_KEY_PREFIX,
      ttl: cacheConfig?.ttl || 3600 // 1 hour default
    };
  }

  /**
   * Connect to Redis
   */
  async connect(): Promise<void> {
    if (this.isConnected) {
      logger.warn('Cache manager already connected');
      return;
    }

    if (!this.config.url) {
      logger.warn('Redis URL not configured, cache disabled');
      return;
    }

    try {
      this.client = createClient({
        url: this.config.url,
        password: this.config.password,
        database: this.config.db
      });

      this.client.on('error', (err) => {
        logger.error({ err }, 'Redis client error');
      });

      this.client.on('connect', () => {
        logger.info('Redis client connecting...');
      });

      this.client.on('ready', () => {
        logger.info('Redis client ready');
        this.isConnected = true;
      });

      await this.client.connect();
      logger.info('✓ Cache manager connected to Redis');
      
    } catch (error) {
      logger.error({ err: error }, 'Failed to connect to Redis');
      throw new DatabaseError('Redis connection failed', {
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Disconnect from Redis
   */
  async disconnect(): Promise<void> {
    if (!this.client || !this.isConnected) {
      return;
    }

    try {
      await this.client.quit();
      this.isConnected = false;
      logger.info('Cache manager disconnected from Redis');
    } catch (error) {
      logger.error({ err: error }, 'Error disconnecting from Redis');
    }
  }

  /**
   * Build full key with prefix
   */
  private buildKey(key: string): string {
    return `${this.config.keyPrefix}${key}`;
  }

  /**
   * Set a value in cache
   */
  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!this.client || !this.isConnected) {
      logger.warn('Cache not available, skipping set operation');
      return;
    }

    try {
      const fullKey = this.buildKey(key);
      const serializedValue = JSON.stringify(value);
      const expirySeconds = ttl || this.config.ttl!;

      await this.client.setEx(fullKey, expirySeconds, serializedValue);
      
      logger.debug(`Cache set: ${fullKey} (TTL: ${expirySeconds}s)`);
    } catch (error) {
      logger.error({ err: error, key }, 'Failed to set cache value');
    }
  }

  /**
   * Get a value from cache
   */
  async get<T = any>(key: string): Promise<T | null> {
    if (!this.client || !this.isConnected) {
      logger.warn('Cache not available, skipping get operation');
      return null;
    }

    try {
      const fullKey = this.buildKey(key);
      const value = await this.client.get(fullKey);

      if (!value) {
        logger.debug(`Cache miss: ${fullKey}`);
        return null;
      }

      logger.debug(`Cache hit: ${fullKey}`);
      return JSON.parse(value) as T;
      
    } catch (error) {
      logger.error({ err: error, key }, 'Failed to get cache value');
      return null;
    }
  }

  /**
   * Delete a value from cache
   */
  async delete(key: string): Promise<void> {
    if (!this.client || !this.isConnected) {
      return;
    }

    try {
      const fullKey = this.buildKey(key);
      await this.client.del(fullKey);
      logger.debug(`Cache deleted: ${fullKey}`);
    } catch (error) {
      logger.error({ err: error, key }, 'Failed to delete cache value');
    }
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }

    try {
      const fullKey = this.buildKey(key);
      const result = await this.client.exists(fullKey);
      return result === 1;
    } catch (error) {
      logger.error({ err: error, key }, 'Failed to check cache existence');
      return false;
    }
  }

  /**
   * Clear all keys with prefix
   */
  async clear(): Promise<void> {
    if (!this.client || !this.isConnected) {
      return;
    }

    try {
      const pattern = `${this.config.keyPrefix}*`;
      const keys = await this.client.keys(pattern);
      
      if (keys.length > 0) {
        await this.client.del(keys);
        logger.info(`Cleared ${keys.length} cache keys`);
      }
    } catch (error) {
      logger.error({ err: error }, 'Failed to clear cache');
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<Record<string, any>> {
    if (!this.client || !this.isConnected) {
      return { connected: false };
    }

    try {
      const info = await this.client.info();
      return {
        connected: true,
        info: info
      };
    } catch (error) {
      logger.error({ err: error }, 'Failed to get cache stats');
      return { connected: false, error: String(error) };
    }
  }

  /**
   * Increment a counter
   */
  async increment(key: string, amount: number = 1): Promise<number> {
    if (!this.client || !this.isConnected) {
      return 0;
    }

    try {
      const fullKey = this.buildKey(key);
      const result = await this.client.incrBy(fullKey, amount);
      return result;
    } catch (error) {
      logger.error({ err: error, key }, 'Failed to increment counter');
      return 0;
    }
  }

  /**
   * Set expiry for a key
   */
  async expire(key: string, seconds: number): Promise<void> {
    if (!this.client || !this.isConnected) {
      return;
    }

    try {
      const fullKey = this.buildKey(key);
      await this.client.expire(fullKey, seconds);
    } catch (error) {
      logger.error({ err: error, key }, 'Failed to set expiry');
    }
  }
}

// Singleton instance
let cacheManager: CacheManager | null = null;

/**
 * Get singleton cache manager instance
 */
export function getCacheManager(): CacheManager {
  if (!cacheManager) {
    cacheManager = new CacheManager();
  }
  return cacheManager;
}

export default getCacheManager;
