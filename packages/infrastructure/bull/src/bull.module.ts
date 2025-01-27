import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import {
  ConfigurationModule,
  ConfigurationService,
} from '@nx-template/configuration';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        redis: {
          host: configService.redisHost,
          port: configService.redisPort,
          retryStrategy: (times: number) => {
            // Retry strategy: throw an error after 3 attempts
            if (times >= 3) {
              console.log(
                'Redis connection failed after 3 attempts: ',
                Date.now()
              );
            }
            // Retry after 1000 milliseconds
            return 1000;
          },
        },
      }),
      inject: [ConfigurationService],
    }),
  ],
  exports: [BullModule],
})
export class NxTemplateBullModule {
  static registerQueues(queueNames: string[]) {
    const queueModules = queueNames.map((name) =>
      BullModule.registerQueue({ name })
    );
    return {
      module: NxTemplateBullModule,
      imports: queueModules,
      exports: queueModules,
    };
  }
}
