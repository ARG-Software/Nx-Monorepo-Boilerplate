import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository, Result, User } from '@nx-template/domain';
import { ILogger } from '@nx-template/log';

export class GetUserByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async execute(query: GetUserByIdQuery): Promise<Result<User>> {
    let user: User | null;
    try {
      user = await this.userRepository.findById(query.id);
    } catch (err: any) {
      this.logger.error(`Error getting user by id`, err);
      const error = new InternalServerErrorException(
        'Error getting user by id'
      );
      return Result.error(error);
    }

    if (user) {
      return Result.success(user);
    }

    this.logger.debug(`User not found with id: ${query.id}`);
    const error = new BadRequestException();
    return Result.error(error);
  }
}
