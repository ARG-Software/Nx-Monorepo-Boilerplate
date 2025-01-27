import { EntitySchema } from '@mikro-orm/core';
import { StrategyBaseEntity, ActionLog } from '@nx-template/domain';
import { actionLogBaseSchema } from './base.configuration';

export const actionLogSchema = new EntitySchema<ActionLog, StrategyBaseEntity>({
  class: ActionLog,
  extends: actionLogBaseSchema,
  schema: 'action-log',
  properties: {
    userId: { type: 'string', nullable: false },
    action: { type: 'string', nullable: false },
  },
});
