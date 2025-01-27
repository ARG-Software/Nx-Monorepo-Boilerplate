import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository, Result, User } from '@nx-template/domain';
import { ILogger } from '@nx-template/log';

export class ConfirmCodeCommand {
  constructor(public code: string, public email: string) {}
}

@CommandHandler(ConfirmCodeCommand)
export class ConfirmCodeCommandHandler
  implements ICommandHandler<ConfirmCodeCommand>
{
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async execute(command: ConfirmCodeCommand): Promise<Result<boolean>> {
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
      this.logger.debug(`No user found with email: ${command.email}`);
      const error = new NotFoundException('No user found with that email');
      return Result.error(error);
    }

    if (user.verificationCode?.toString() !== command.code.toString()) {
      this.logger.debug(
        `Verification code does not match for user with email: ${command.email}`
      );
      const error = new BadRequestException('Verification code does not match');
      return Result.error(error);
    }

    user.isVerified = true;
    user.verificationCode = null;

    try {
      await this.userRepository.update(user);
    } catch (err: any) {
      const error = new InternalServerErrorException('Error saving user');
      this.logger.error(`Error saving user`, error);
      return Result.error(error);
    }

    return Result.success(true);
  }
}
