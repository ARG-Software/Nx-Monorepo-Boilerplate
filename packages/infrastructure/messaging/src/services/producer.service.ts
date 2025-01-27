import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { KafkajsProducer } from '../kafka/messaging.kafka-producer';
import { IMessageRecord } from '@nx-template/application';
import { ConfigurationService } from '@nx-template/configuration';
import { IProducer } from '../interfaces/iproducer';

@Injectable()
export class MessagingProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();
  private readonly brokerUrl: string;

  constructor(private readonly configService: ConfigurationService) {
    try {
      this.brokerUrl = this.configService.kafkaBroker;
    } catch (error) {
      console.error(
        'Error getting configuration on message producer service:',
        error
      );
      throw error;
    }
  }

  async produce(message: IMessageRecord) {
    const producer = await this.getProducer(message.topic, this.brokerUrl);
    await producer.produce(message);
  }

  async disconnect() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }

  private async getProducer(topic: string, broker: string) {
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkajsProducer(broker);
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async healthCheck() {
    const topicsHealth = [];
    for (const producer of this.producers.values()) {
      const topicHealth = await producer.healthCheck();
      topicsHealth.push(topicHealth);
    }
    return topicsHealth;
  }

  async onApplicationShutdown() {
    await this.disconnect();
  }
}
