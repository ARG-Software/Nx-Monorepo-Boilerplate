import { MessagePayload } from '@nx-template/application';
import { Consumer, ConsumerConfig, Kafka } from 'kafkajs';
import { IConsumer } from '../interfaces/iconsumer';

export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private isConnected: boolean = false;

  constructor(
    private readonly topic: string,
    config: ConsumerConfig,
    brokerUrl: string
  ) {
    this.kafka = new Kafka({ brokers: [brokerUrl] });
    this.consumer = this.kafka.consumer(config);

    // Register event listeners
    this.consumer.on('consumer.connect', async () => {
      console.log('Connected to Kafka.');
      this.isConnected = true;
    });

    this.consumer.on('consumer.crash', async () => {
      console.error('Kafka consumer crashed:');
      this.isConnected = false;
      await this.connect();
    });

    this.consumer.on('consumer.stop', async () => {
      console.log('Disconnected from Kafka.');
      this.isConnected = false;
      await this.connect();
    });
  }

  async consume(onMessage: (message: MessagePayload) => Promise<void>) {
    await this.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message, partition, heartbeat }) => {
        const messageString = message.value?.toString() || '';
        const messageIncoming = JSON.parse(messageString);
        try {
          await onMessage(messageIncoming as any);
        } catch (error) {
          console.error('Error processing message:', error);
        } finally {
          await heartbeat();
        }
      },
    });
  }

  async healthCheck(): Promise<string> {
    const admin = this.kafka.admin();
    let healthResponse;
    try {
      await admin.connect();
      healthResponse = await admin.fetchTopicMetadata();
    } catch (error) {
      console.error('Kafka health check failed:', error);
      return 'Kafka health check failed';
    } finally {
      await admin.disconnect();
    }
    return JSON.stringify(healthResponse);
  }

  async connect() {
    if (this.isConnected) {
      return;
    }
    try {
      await this.consumer.connect();
      this.isConnected = true;
    } catch (error) {
      console.error('Error connecting to Kafka:', error);
      // Retry connecting after a delay
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Retry after 5 seconds
      await this.connect();
    }
  }

  async disconnect() {
    try {
      await this.consumer.disconnect();
      this.isConnected = false;
    } catch (error) {
      console.error('Error disconnecting from Kafka:', error);
    }
  }
}
