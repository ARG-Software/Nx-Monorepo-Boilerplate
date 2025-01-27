import { Module } from '@nestjs/common';
import { MessagingProducerService } from './services/producer.service';
import { MessagingConsumerService } from './services/consumer.service';

@Module({
  controllers: [],
  providers: [MessagingProducerService, MessagingConsumerService],
  exports: [MessagingProducerService, MessagingConsumerService],
})
export class MessagingModule {}
