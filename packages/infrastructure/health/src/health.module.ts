import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import {
  MessagingConsumerService,
  MessagingProducerService,
} from '@nx-template/messaging';

@Module({
  controllers: [HealthController],
  providers: [MessagingProducerService, MessagingConsumerService],
  imports: [TerminusModule],
})
export class HealthModule {}
