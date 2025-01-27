import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

export function mikroOrmTestStrategyConfig(connectionUrl: string): Options {
  return {
    clientUrl: connectionUrl,
    driver: PostgreSqlDriver,
    entities: [
      './packages/infrastructure/persistance/src/modules/action-log/configurations/*.js',
    ],
    entitiesTs: [
      './packages/infrastructure/persistance/src/modules/action-log/configurations/*.ts',
    ],
    migrations: {
      path: './tools/database/migrations/action-log',
      tableName: 'action-log_migrations',
    },
    extensions: [Migrator],
  };
}
