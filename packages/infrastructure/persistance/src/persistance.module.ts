import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntitySchema, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigurationService } from '@nx-template/configuration';
import { MainPersistanceModule, mainSchemas } from './modules/main';
import { actionLogSchemas } from './modules/action-log';
import { ActionLogPersistanceModule } from './modules/action-log/action-log-persistance.module';

@Module({})
export class PersistanceModule {
  static registerMainPersistanceModule() {
    const mikroOrmModule = createDatabaseConfiguration(mainSchemas);

    return {
      module: PersistanceModule,
      imports: [mikroOrmModule, MainPersistanceModule],
    };
  }

  static registerActionLogPersistanceModule() {
    const mikroOrmModule = createDatabaseConfiguration(actionLogSchemas);

    return {
      module: PersistanceModule,
      imports: [mikroOrmModule, ActionLogPersistanceModule],
    };
  }

  static registerTestMainPersistanceModule(connectionUrl: string) {
    const mikroOrmModule = createTestingDatabaseConfiguration(
      mainSchemas,
      connectionUrl
    );

    return {
      module: PersistanceModule,
      imports: [mikroOrmModule, MainPersistanceModule],
    };
  }

  static registerTestActionLogPersistanceModule(connectionUrl: string) {
    const mikroOrmModule = createTestingDatabaseConfiguration(
      actionLogSchemas,
      connectionUrl
    );

    return {
      module: PersistanceModule,
      imports: [mikroOrmModule, ActionLogPersistanceModule],
    };
  }
}

function createDatabaseConfiguration(schemas: EntitySchema[]) {
  return MikroOrmModule.forRootAsync({
    useFactory: (configService: ConfigurationService) => ({
      allowGlobalContext: true,
      driver: PostgreSqlDriver,
      port: configService.databasePort,
      user: configService.databaseUser,
      host: configService.databaseHost,
      dbName: configService.databaseName,
      schema: configService.databaseSchema,
      password: configService.databasePassword,
      entities: schemas,
    }),
    inject: [ConfigurationService],
  });
}

function createTestingDatabaseConfiguration(
  schemas: EntitySchema[],
  connectionUrl: string
) {
  return MikroOrmModule.forRootAsync({
    useFactory: () => ({
      allowGlobalContext: true,
      driver: PostgreSqlDriver,
      clientUrl: connectionUrl,
      entities: schemas,
    }),
  });
}
