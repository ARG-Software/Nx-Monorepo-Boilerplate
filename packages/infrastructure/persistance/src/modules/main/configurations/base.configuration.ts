import { EntitySchema } from '@mikro-orm/core';
import { MainBaseEntity } from '@nx-template/domain';
import * as Crypto from 'crypto';

export const mainBaseSchema = new EntitySchema<MainBaseEntity>({
  name: 'BaseEntity',
  abstract: true,
  properties: {
    id: {
      type: 'string',
      primary: true,
      onCreate: () => Crypto.randomUUID(),
    },
    createdAt: {
      type: 'string',
      onCreate: () => new Date().toISOString(),
      nullable: true,
    },
    modifiedAt: {
      type: 'string',
      onCreate: () => new Date().toISOString(),
      onUpdate: () => new Date().toISOString(),
      nullable: true,
    },
  },
});
