export enum CompressionTypes {
  None = 0,
  GZIP = 1,
}

export type MessagePayload = {
  messageType?: string;
};

export interface IMessageRecord {
  topic: string;
  messages: IMessage[];
  messageType: string;
  acks?: number;
  timeout?: number;
  compression?: CompressionTypes;
}

export interface IMessage {
  key: Buffer | string;
  value: Buffer | string;
  partition?: number;
  headers?: Buffer | string | (Buffer | string)[] | undefined;
  timestamp?: BigInt;
}
