import { Module } from '@nestjs/common';
import { CronJobService } from './cronjob.service';
import { ICronJob } from './cronjob.interface';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    {
      provide: ICronJob,
      useClass: CronJobService,
    },
  ],
  exports: [ICronJob],
})
export class NxTemplateCronJobModule {}
