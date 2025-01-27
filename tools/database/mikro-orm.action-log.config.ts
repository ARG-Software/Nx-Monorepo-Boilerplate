import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

const mikroOrmStrategyConfig: Options = {
  port: 5432,
  user: 'user',
  host: 'localhost',
  driver: PostgreSqlDriver,
  dbName: 'nx-template',
  schema: 'action-log',
  password: 'password',
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

export default mikroOrmStrategyConfig;
