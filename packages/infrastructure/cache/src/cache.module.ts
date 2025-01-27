import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import { ICache } from './cache.interface';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60000, // seconds
      max: 100, // maximum number of items in cache
    }),
  ],
  providers: [
    {
      provide: ICache,
      useClass: CacheService,
    },
  ],
  exports: [ICache],
})
export class NxTemplateCacheModule {}
