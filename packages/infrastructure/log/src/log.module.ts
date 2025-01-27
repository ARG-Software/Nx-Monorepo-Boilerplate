import { Global, Module, Scope } from '@nestjs/common';
import { ILogger } from './log.interface';
import { LogService } from './services/log.service';
import { MessagingModule } from '@nx-template/messaging';
import { RequestContextModule } from 'nestjs-request-context';
import { CorrelationIdExpressMiddleware } from './middleware/corelationexpress.middleware';
import { ErrsoleService } from './services/errsole.service';
import { ConfigurationService } from '@nx-template/configuration';

@Global()
@Module({
  imports: [MessagingModule, RequestContextModule],
  providers: [
    {
      provide: ILogger,
      useClass: LogService,
      scope: Scope.TRANSIENT,
    },
    CorrelationIdExpressMiddleware,
    LogService,
    {
      provide: ErrsoleService,
      useFactory: async (configService: ConfigurationService) => {
        if (configService.logTo === 'errsole') {
          return new ErrsoleService(configService);
        }
        return null;
      },
      inject: [ConfigurationService],
    },
  ],
  exports: [ILogger, CorrelationIdExpressMiddleware, LogService],
})
export class LogModule {}
