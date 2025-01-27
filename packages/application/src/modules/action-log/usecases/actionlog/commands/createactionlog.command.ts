import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import {
  ActionLog,
  IActionLogRepository,
  IUserRepository,
  Result,
  User,
} from '@nx-template/domain';
import { ILogger } from '@nx-template/log';

export class CreateActionLogCommand {
  constructor(public readonly userId: string, public readonly action: string) {}
}

@CommandHandler(CreateActionLogCommand)
export class CreateActionLogCommandHandler
  implements ICommandHandler<CreateActionLogCommand>
{
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(IActionLogRepository)
    private readonly actionLogRepository: IActionLogRepository,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async execute(command: CreateActionLogCommand): Promise<Result<string>> {
    let existingUser: User | null;

    try {
      existingUser = await this.userRepository.findById(command.userId);
    } catch (err: any) {
      const error = new InternalServerErrorException(
        'Error getting user by id'
      );
      this.logger.error(`Error getting user by id`, error);
      return Result.error(error);
    }

    if (!existingUser) {
      this.logger.debug(`User doesnt exists with id: ${command.userId}`);
      const error = new NotFoundException('User doesnt exists with that id');

      return Result.error(error);
    }

    const newActionLog = new ActionLog(command.userId, command.action);

    let actionLogId: string;
    try {
      actionLogId = await this.actionLogRepository.create(newActionLog);
    } catch (err: any) {
      const error = new InternalServerErrorException('Error creating user');
      this.logger.error(`Error creating user`, err);
      return Result.error(error);
    }
    return Result.success(actionLogId);
  }
}
