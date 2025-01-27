import { Global, Module } from '@nestjs/common';
import { mainRepositories } from '.';

@Global()
@Module({
  providers: [...mainRepositories],
  exports: [...mainRepositories],
})
export class MainPersistanceModule {}
