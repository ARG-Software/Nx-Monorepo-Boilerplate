import { Module } from '@nestjs/common';
import { LogModule } from '@nx-template/log';
import { ConfigurationModule } from '@nx-template/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { ActionLogMessagingService } from './app.messaging.service';
import { MessagingModule } from '@nx-template/messaging';
import { ApplicationModule } from '@nx-template/application';
import { PersistanceModule } from '@nx-template/persistance';

@Module({
  imports: [
    MessagingModule,
    ScheduleModule.forRoot(),
    PersistanceModule.registerActionLogPersistanceModule(),
    ApplicationModule.registerActionLogApplication(),
    ConfigurationModule,
    LogModule,
  ],
  providers: [ActionLogMessagingService],
  controllers: [],
})
export class AppModule {}
