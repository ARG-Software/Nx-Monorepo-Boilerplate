import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import {
  ActionLog,
  IActionLogRepository,
  UnableToAddActionLogError,
} from '@nx-template/domain';
import { ILogger } from '@nx-template/log';
import { actionLogSchema } from '../configurations/actionlog.configuration';

@Injectable()
export class ActionLogRepository implements IActionLogRepository {
  private readonly _repository: EntityRepository<ActionLog>;

  constructor(
    private readonly em: EntityManager,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this._repository = this.em.getRepository(actionLogSchema);
    this.logger.createChildLogger(this.constructor.name);
  }

  async create(actionLog: ActionLog): Promise<string> {
    try {
      const newActionLog = this._repository.create(actionLog);
      await this._repository.getEntityManager().flush();
      return newActionLog.id;
    } catch (error) {
      this.logger.error('Error creating action log', error);
      throw new UnableToAddActionLogError();
    }
  }
}
