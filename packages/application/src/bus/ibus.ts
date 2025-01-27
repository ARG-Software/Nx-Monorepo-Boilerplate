import { ICommand, IQuery } from '@nestjs/cqrs';
import { Result } from '@nx-template/domain';

export interface IBus {
  /**
   * Send a command to the bus to create
   * @param command
   * @returns Promise<Result<boolean | string>> - boolean for update, string for create
   */
  commandCreate<T>(command: ICommand): Promise<Result<string>>;

  /**
   * Send a command to the bus to update
   * @param command
   * @returns Promise<Result<boolean>>
   */
  commandUpdate<T>(command: ICommand): Promise<Result<boolean>>;

  /**
   * Send a query to the bus
   * @param query
   */
  query<T>(query: IQuery): Promise<Result<T>>;
}

export const IBus = Symbol('IBus');
