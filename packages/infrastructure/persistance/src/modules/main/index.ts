import { Scope } from '@nestjs/common';
import { IUserRepository } from '@nx-template/domain';
import { userSchema } from './configurations/user.configuration';
import { UserRepository } from './repositories/user.repository';

export const mainSchemas = [userSchema];

export const mainRepositories = [
  {
    useClass: UserRepository,
    provide: IUserRepository,
    Scope: Scope.REQUEST,
  },
];

export * from './main-persistance.module';
