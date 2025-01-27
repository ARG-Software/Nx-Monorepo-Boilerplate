import { Module } from '@nestjs/common';
import { mainApihandlers } from '.';

@Module({
  providers: [...mainApihandlers],
  exports: [...mainApihandlers],
})
export class MainApplicationModule {}
