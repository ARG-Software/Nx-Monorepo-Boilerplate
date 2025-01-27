import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateActionLogCommand,
  CreateActionLogMessage,
  CreateActionLogMessagePayload,
  IBus,
  MessagePayload,
  ACTION_LOG_TOPIC,
} from '@nx-template/application';
import { ILogger } from '@nx-template/log';
import { MessagingConsumerService } from '@nx-template/messaging';

@Injectable()
export class ActionLogMessagingService implements OnModuleInit {
  constructor(
    private readonly consumerService: MessagingConsumerService,
    @Inject(ILogger) private readonly logger: ILogger,
    @Inject(IBus) private readonly memoryBus: IBus
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async onModuleInit() {
    await this.consumerService.consume({
      topic: ACTION_LOG_TOPIC,
      groupId: 'action-log-consumer',
      onMessage: async (message: MessagePayload) => {
        switch (message.messageType) {
          case CreateActionLogMessage.name: {
            const createLogMessage = message as CreateActionLogMessagePayload;
            this.logger.info(
              'Received log message:\n',
              JSON.stringify(createLogMessage)
            );

            const createLogCommand = await this.memoryBus.commandCreate(
              new CreateActionLogCommand(
                createLogMessage.userId,
                createLogMessage.action
              )
            );

            if (createLogCommand.isFailure()) {
              throw createLogCommand.getError();
            }

            break;
          }
          default:
            this.logger.error(
              'Unknown message type: ',
              JSON.stringify(message)
            );
            break;
        }
      },
    });
  }
}
