import { EntitySchema } from '@mikro-orm/core';
import { MainBaseEntity } from '@nx-template/domain';
import { v4 } from 'uuid';

export const mainBaseSchema = new EntitySchema<MainBaseEntity>({
  name: 'BaseEntity',
  abstract: true,
  properties: {
    id: {
      type: 'string',
      primary: true,
      onCreate: () => v4(),
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
