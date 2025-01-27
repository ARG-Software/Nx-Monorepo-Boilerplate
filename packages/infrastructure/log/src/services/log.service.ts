import { Inject, Injectable, Optional } from '@nestjs/common';
import * as winston from 'winston';
import { ILogger } from '../log.interface';
import { ConfigurationService } from '@nx-template/configuration';
import { LogBaseService } from './log.base.service';
import { ErrsoleService } from './errsole.service';

@Injectable()
export class LogService extends LogBaseService implements ILogger {
  private readonly logger: winston.Logger;

  constructor(
    public override readonly configService: ConfigurationService,
    @Optional()
    @Inject(ErrsoleService)
    private readonly errsoleService: ErrsoleService | null
  ) {
    super(configService);
    const logLevel = configService.logLevel;
    const logTo = configService.logTo;

    switch (logTo) {
      case 'errsole': {
        if (!this.errsoleService) {
          throw new Error(
            'ErrsoleService must be provided when logTo is set to "errsole"'
          );
        }
        this.logger = this.createErrsoleLogger(logLevel);
        break;
      }

      default: {
        this.logger = this.createConsoleLogger(logLevel);
        break;
      }
    }
  }

  public createChildLogger(context: string) {
    this.logger.defaultMeta = { context };
  }

  public async log(message: string, data?: any) {
    const corelationId = this.correlationId;
    if (data) {
      this.logger.log({ level: 'info', message, data, corelationId });
    } else {
      this.logger.log({ level: 'info', message, corelationId });
    }
  }

  public async debug(message: string, data?: any) {
    const corelationId = this.correlationId;
    if (data) {
      this.logger.debug(message + data, { data, corelationId });
    }
    this.logger.debug(message, { corelationId });
  }

  public async info(message: string, data?: any) {
    const corelationId = this.correlationId;
    if (data) {
      this.logger.info(message + data, { data, corelationId });
    } else {
      this.logger.info(message, { corelationId });
    }
  }

  public async warn(message: string, data?: any) {
    const corelationId = this.correlationId;
    if (data) {
      this.logger.warn(message + data, { data, corelationId });
    } else {
      this.logger.warn(message, { corelationId });
    }
  }

  public async error(message: string, data?: any) {
    const corelationId = this.correlationId;
    if (data) {
      this.logger.error(message + data, { data, corelationId });
    } else {
      this.logger.error(message, { corelationId });
    }
  }
}
