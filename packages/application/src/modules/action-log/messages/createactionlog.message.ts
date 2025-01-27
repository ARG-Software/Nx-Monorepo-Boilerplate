import { Message } from '../../../messaging/message';
import { ACTION_LOG_TOPIC } from '../../../messaging/topics';
import { MessagePayload } from '../../../messaging/interfaces';

export interface CreateActionLogMessagePayload extends MessagePayload {
  userId: string;
  action: string;
}

export class CreateActionLogMessage extends Message<CreateActionLogMessagePayload> {
  override topic: string = ACTION_LOG_TOPIC;
  override messageType: string = this.constructor.name;

  constructor(payload: CreateActionLogMessagePayload[]) {
    super(payload);
    payload.forEach((p) => this.validatePayload(p));
  }

  override validatePayload(payload: CreateActionLogMessagePayload): void {
    const { userId, action } = payload;

    if (!userId) {
      throw new Error('userId is required.');
    }

    if (!action) {
      throw new Error('action is required.');
    }
  }
}
