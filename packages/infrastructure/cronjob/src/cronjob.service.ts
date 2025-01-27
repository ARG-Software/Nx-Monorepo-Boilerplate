import { Injectable, Inject } from '@nestjs/common';
import { ILogger } from '@nx-template/log';
import { IBus } from '@nx-template/application';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronJobService {
  constructor(
    @Inject(ILogger) private readonly logger: ILogger,
    @Inject(IBus) private readonly bus: IBus
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    // Add CronJob Commands
  }
}
