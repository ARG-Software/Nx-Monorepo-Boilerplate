import {
  CompressionTypes,
  IMessage,
  IMessageRecord,
  MessagePayload,
} from './interfaces';
import * as Crypto from 'crypto';

export abstract class Message<T extends MessagePayload>
  implements IMessageRecord
{
  abstract topic: string;

  messages: IMessage[];
  compression?: CompressionTypes = CompressionTypes.GZIP;
  abstract messageType: string;
  acks?: number;
  timeout?: number;

  public constructor(payload: T[]) {
    this.messages = payload.map((p) => {
      p.messageType = this.constructor.name;
      this.validatePayload(p);
      return {
        key: Crypto.randomUUID(),
        value: JSON.stringify(p),
      };
    });
  }

  protected toString(): string {
    return JSON.stringify(this);
  }

  private createMessages(payload: T[]): IMessage {
    return {
      key: Crypto.randomUUID(),
      value: JSON.stringify(payload),
    };
  }
  
  abstract validatePayload(payload: T): void;
}
