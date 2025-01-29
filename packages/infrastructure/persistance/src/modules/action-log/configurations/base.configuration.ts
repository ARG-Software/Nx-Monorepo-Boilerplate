import { EntitySchema } from '@mikro-orm/core';
import { StrategyBaseEntity } from '@nx-template/domain';
import * as Crypto from 'crypto';

export const actionLogBaseSchema = new EntitySchema<StrategyBaseEntity>({
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
