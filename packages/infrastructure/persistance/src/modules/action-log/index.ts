import { Scope } from '@nestjs/common';
import { IActionLogRepository, IUserRepository } from '@nx-template/domain';
import { ActionLogRepository } from './repositories/actionlog.repository';
import { actionLogSchema } from './configurations/actionlog.configuration';
import { UserRepository } from '../main/repositories/user.repository';
import { userSchema } from '../main/configurations/user.configuration';

export const actionLogSchemas = [actionLogSchema, userSchema];

export const actionLogRepositories = [
  {
    useClass: ActionLogRepository,
    provide: IActionLogRepository,
    Scope: Scope.TRANSIENT,
  },
  {
    useClass: UserRepository,
    provide: IUserRepository,
    Scope: Scope.REQUEST,
  },
];

export * from './action-log-persistance.module';
