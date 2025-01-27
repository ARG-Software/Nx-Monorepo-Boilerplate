import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository, Result, User } from '@nx-template/domain';
import { ILogger } from '@nx-template/log';
import * as bcrypt from 'bcrypt';

export class ResetPasswordCommand {
  constructor(
    public email: string,
    public password: string,
    public code: string
  ) {}
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async execute(command: ResetPasswordCommand): Promise<Result<string>> {
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

    if (user.resetPasswordCode != command.code) {
      this.logger.debug(`Invalid code for user: ${command.email}`);
      const error = new BadRequestException('Invalid code');
      return Result.error(error);
    }

    const now = new Date();

    if (!user.resetPasswordExpiration || user.resetPasswordExpiration < now) {
      this.logger.debug(`Code expired for user: ${command.email}`);
      const error = new BadRequestException('Code expired');
      return Result.error(error);
    }

    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(command.password, 10);
    } catch (err: any) {
      const error = new InternalServerErrorException('Error hashing password');
      this.logger.error(`Error hashing password`, err);
      return Result.error(error);
    }

    user.password = hashedPassword;
    user.resetPasswordCode = null;
    user.resetPasswordExpiration = null;

    try {
      await this.userRepository.update(user);
    } catch (err: any) {
      const error = new InternalServerErrorException('Error saving user');
      this.logger.error(`Error saving user`, error);
      return Result.error(error);
    }

    return Result.success('Password reset successfully');
  }
}
