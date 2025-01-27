import { Global, Module } from '@nestjs/common';
import { actionLogRepositories } from '.';

@Global()
@Module({
  providers: [...actionLogRepositories],
  exports: [...actionLogRepositories],
})
export class ActionLogPersistanceModule {}
