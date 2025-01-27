import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository, Result, User } from '@nx-template/domain';
import { ILogger } from '@nx-template/log';

export class GetUsersListQuery {}

@QueryHandler(GetUsersListQuery)
export class GetUsersListQueryHandler
  implements IQueryHandler<GetUsersListQuery>
{
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async execute(query: GetUsersListQuery): Promise<Result<Partial<User>[]>> {
    try {
      const users = await this.userRepository.getAll();

      return Result.success(users);
    } catch (error: any) {
      this.logger.error(`Error getting users list`, error);
      return Result.errorMessage('Error getting users list.');
    }
  }
}
