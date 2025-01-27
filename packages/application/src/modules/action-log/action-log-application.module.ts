import { Module } from '@nestjs/common';
import { actionLogServiceHandlers } from '.';

@Module({
  providers: [...actionLogServiceHandlers],
  exports: [...actionLogServiceHandlers],
})
export class ActionLogApplicationModule {}
