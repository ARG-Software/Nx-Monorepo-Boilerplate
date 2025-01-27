import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository, Result, User } from '@nx-template/domain';
import { ILogger } from '@nx-template/log';

export class GetUserByEmailQuery {
  constructor(public readonly email: string) {}
}

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async execute(query: GetUserByEmailQuery): Promise<Result<User>> {
    let user: User | null;
    try {
      user = await this.userRepository.findByEmail(query.email);
    } catch (err: any) {
      this.logger.error(`Error getting user by email`, err);
      const error = new InternalServerErrorException(
        'Error getting user by email'
      );
      return Result.error(error);
    }

    if (user) {
      this.logger.debug(`User found with email: ${query.email}`);
      return Result.success(user);
    }

    this.logger.debug(`User not found with email: ${query.email}`);
    const error = new BadRequestException('User not found with that email');
    return Result.error(error);
  }
}
