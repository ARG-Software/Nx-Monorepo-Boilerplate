import { Message } from '../message';
import { LOG_TOPIC } from '../topics';
import { MessagePayload } from '../interfaces';

export interface LogMessagePayload extends MessagePayload {
  message: string;
  level: string;
  error: Error | string | undefined;
  context: string;
}

export class LogMessageEvent extends Message<LogMessagePayload> {
  override topic: string = LOG_TOPIC;
  override messageType: string = this.constructor.name;

  constructor(payload: LogMessagePayload[]) {
    super(payload);
    payload.forEach((p) => this.validatePayload(p));
  }

  override validatePayload(payload: LogMessagePayload): void {
    const { message, level } = payload;

    if (!message) {
      throw new Error('message is required.');
    }
    if (!level) {
      throw new Error('level is required.');
    }
  }
}
