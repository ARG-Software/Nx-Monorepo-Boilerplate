import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { IUserRepository, Result, User } from '@nx-template/domain';
import { ILogger } from '@nx-template/log';

export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async execute(command: CreateUserCommand): Promise<Result<string>> {
    let existingUser: User | null;

    try {
      existingUser = await this.userRepository.findByEmail(command.email);
    } catch (err: any) {
      const error = new InternalServerErrorException(
        'Error getting user by email'
      );
      this.logger.error(`Error getting user by email`, error);
      return Result.error(error);
    }

    if (existingUser) {
      this.logger.debug(`User already exists with email: ${command.email}`);
      const error = new ConflictException(
        'User already exists with that email'
      );

      return Result.error(error);
    }

    let hashedPassword: string;
    let verificationCode: string;
    try {
      hashedPassword = await bcrypt.hash(command.password, 10);
      verificationCode = crypto.randomInt(1000, 999999).toString();
    } catch (err: any) {
      const error = new InternalServerErrorException('Something went wrong');
      this.logger.error(`Error hashing password`, err);
      return Result.error(error);
    }

    const newUser = new User(
      command.email,
      command.name,
      hashedPassword,
      verificationCode,
      false
    );

    let userId: string;
    try {
      userId = await this.userRepository.add(newUser);
    } catch (err: any) {
      const error = new InternalServerErrorException('Error creating user');
      this.logger.error(`Error creating user`, err);
      return Result.error(error);
    }
    return Result.success(userId);
  }
}
