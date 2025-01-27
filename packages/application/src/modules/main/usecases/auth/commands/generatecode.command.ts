import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository, Result, User } from '@nx-template/domain';
import { ILogger } from '@nx-template/log';

export class GenerateCodeCommand {
  constructor(public readonly email: string) {}
}

@CommandHandler(GenerateCodeCommand)
export class GenerateCodeCommandHandler
  implements ICommandHandler<GenerateCodeCommand>
{
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async execute(command: GenerateCodeCommand): Promise<Result<number>> {
    let user: User | null;

    try {
      user = await this.userRepository.findByEmail(command.email);
    } catch (err: any) {
      const error = new InternalServerErrorException(
        'Error getting user by email'
      );
      this.logger.error(`Error getting user by email`, error);
      return Result.error(error);
    }

    if (!user) {
      this.logger.debug(`No user found with id: ${command.email}`);
      const error = new NotFoundException('No user found with that email');
      return Result.error(error);
    }

    const code = crypto.randomInt(1000, 999999);
    user.verificationCode = code.toString();

    try {
      await this.userRepository.update(user);
    } catch (err: any) {
      const error = new InternalServerErrorException('Error saving user');
      this.logger.error(`Error saving user`, error);
      return Result.error(error);
    }

    return Result.success(code);
  }
}
