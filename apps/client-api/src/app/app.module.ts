import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CorrelationIdExpressMiddleware, LogModule } from '@nx-template/log';
import { ConfigurationModule } from '@nx-template/configuration';
import { PersistanceModule } from '@nx-template/persistance';
import { ApplicationModule } from '@nx-template/application';
import {
  MessagingConsumerService,
  MessagingModule,
  MessagingProducerService,
} from '@nx-template/messaging';
import './mappings';
import { HealthModule } from '@nx-template/health';
import { NxTemplateCronJobModule } from '@nx-template/cronjob';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from '@nx-template/email';
import { NxTemplateBullModule } from '@nx-template/bull';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigurationModule,
    MessagingModule,
    LogModule,
    PersistanceModule.registerMainPersistanceModule(),
    NxTemplateBullModule.registerQueues(['emails']),
    ApplicationModule.registerMainApplication(),
    HealthModule,
    NxTemplateCronJobModule,
    AuthenticationModule,
    EmailModule,
    UserModule,
  ],
  providers: [MessagingConsumerService, MessagingProducerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdExpressMiddleware).forRoutes('*');
  }
}
