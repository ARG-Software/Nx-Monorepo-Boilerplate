import { Global, Module } from '@nestjs/common';
import { MainApplicationModule } from './src/modules/main';
import { CqrsModule } from '@nestjs/cqrs';
import { IBus } from './src/bus/ibus';
import { MemoryBus } from './src/bus/implementations/memorybus';
import { ActionLogApplicationModule } from './src';

@Global()
@Module({})
export class ApplicationModule {
  static registerMainApplication() {
    return {
      module: ApplicationModule,
      providers: [
        {
          provide: IBus,
          useClass: MemoryBus,
        },
      ],
      exports: [IBus],
      imports: [CqrsModule.forRoot(), MainApplicationModule],
    };
  }

  static registerActionLogApplication() {
    return {
      module: ApplicationModule,
      providers: [
        {
          provide: IBus,
          useClass: MemoryBus,
        },
      ],
      exports: [IBus],
      imports: [CqrsModule.forRoot(), ActionLogApplicationModule],
    };
  }
}
