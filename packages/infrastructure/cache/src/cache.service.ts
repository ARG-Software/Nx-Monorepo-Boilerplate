import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { ICache } from './cache.interface';
import { ILogger } from '@nx-template/log';

@Injectable()
export class CacheService implements ICache {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async get(prefix: string, key: string): Promise<any> {
    try {
      return await this.cacheManager.get(`${prefix}:${key}`);
    } catch (e) {
      this.logger.error('Error getting cache', e);
      return null;
    }
  }
  async set(prefix: string, key: string, value: any): Promise<void> {
    try {
      await this.cacheManager.set(`${prefix}:${key}`, value);
    } catch (e) {
      this.logger.error('Error setting cache', e);
    }
  }
  async del(prefix: string, key: string): Promise<void> {
    try {
      await this.cacheManager.del(`${prefix}:${key}`);
    } catch (e) {
      this.logger.error('Error deleting cache', e);
    }
  }
}
