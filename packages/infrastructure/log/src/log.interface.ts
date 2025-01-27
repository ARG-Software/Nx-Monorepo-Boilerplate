export interface ILogOptions {
  logLevel: ILogLevel;
  logTo: ILogTo;
}

export type ILogLevel = 'debug' | 'info' | 'warn' | 'error';

export type ILogTo = 'console' | 'errsole';

export interface ILogger {
  createChildLogger(context: string): void;
  log(message: string, data?: any): void;
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, data?: any): void;
}

export const ILogger = Symbol('ILogger');
