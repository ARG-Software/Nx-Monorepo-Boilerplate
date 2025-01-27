import { Injectable } from '@nestjs/common';
import { IBus } from '../ibus';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Result } from '@nx-template/domain';

@Injectable()
export class MemoryBus implements IBus {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}
  async commandCreate<T>(command: ICommand): Promise<Result<string>> {
    return await this.commandBus.execute(command);
  }
  async commandUpdate<T>(command: ICommand): Promise<Result<boolean>> {
    return await this.commandBus.execute(command);
  }

  async query<T>(query: IQuery): Promise<T> {
    return await this.queryBus.execute(query);
  }
}
