import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { MessagePayload } from '@nx-template/application';
import { KafkajsConsumer } from '../kafka/messaging.kafka-consumer';
import { ConfigurationService } from '@nx-template/configuration';
import { IConsumer } from '../interfaces/iconsumer';

export interface KafkajsConsumerOptions {
  topic: string;
  groupId: string;
  onMessage: (message: MessagePayload) => Promise<void>;
}

@Injectable()
export class MessagingConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];
  private readonly brokerUrl: string;

  constructor(private readonly configService: ConfigurationService) {
    try {
      this.brokerUrl = this.configService.kafkaBroker;
    } catch (error) {
      console.error(
        'Error getting configuration on message consumer service:',
        error
      );
      throw error;
    }
  }

  async consume({ topic, groupId, onMessage }: KafkajsConsumerOptions) {
    const consumer = new KafkajsConsumer(topic, { groupId }, this.brokerUrl);
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  //implement health check
  async healthCheck() {
    const topicsHealth = [];
    for (const consumer of this.consumers) {
      const topicHealth = await consumer.healthCheck();
      topicsHealth.push(topicHealth);
    }
  }
}
