import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

const mikroOrmMainConfig: Options = {
  port: 5432,
  user: 'user',
  host: 'localhost',
  driver: PostgreSqlDriver,
  dbName: 'nx-template',
  schema: 'app',
  password: 'password',
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

export default mikroOrmMainConfig;
