import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

export function mikroOrmTestMainConfig(connectionUrl: string): Options {
  return {
    clientUrl: connectionUrl,
    driver: PostgreSqlDriver,
    entities: [
      './packages/infrastructure/persistance/src/modules/main/configurations/*.js',
    ],
    entitiesTs: [
      './packages/infrastructure/persistance/src/modules/main/configurations/*.ts',
    ],
    migrations: {
      path: './tools/database/migrations/main',
      tableName: 'main_migrations',
    },
    extensions: [Migrator],
  };
}
