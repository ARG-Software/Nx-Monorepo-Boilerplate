import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MikroOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import {
  MessagingConsumerService,
  MessagingProducerService,
} from '@nx-template/messaging';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private mikroOrmHealthIndicator: MikroOrmHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
    private messagingProducerService: MessagingProducerService,
    private messagingConsumerService: MessagingConsumerService
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.mikroOrmHealthIndicator.pingCheck('database'),
      // the process should not use more than 300MB memory
      () =>
        this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      // The process should not have more than 300MB RSS memory allocated
      () =>
        this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
      // the used disk storage should not exceed the 50% of the available space
      () =>
        this.diskHealthIndicator.checkStorage('disk health', {
          thresholdPercent: 0.5,
          path: '/',
        }),
    ]);
  }

  @Get('messaging/producers')
  @HealthCheck()
  async checkMessaging() {
    return this.messagingProducerService.healthCheck();
  }

  @Get('messaging/consumers')
  @HealthCheck()
  async checkMessagingConsumers() {
    return this.messagingConsumerService.healthCheck();
  }
}
