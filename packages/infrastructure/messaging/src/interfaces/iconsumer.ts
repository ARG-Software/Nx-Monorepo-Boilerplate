export interface IConsumer {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  consume: (message: any) => Promise<void>;
  healthCheck: () => Promise<string>;
}

export const IConsumer = Symbol('IConsumer');
