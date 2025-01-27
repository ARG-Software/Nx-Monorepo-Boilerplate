import { StrategyBaseEntity } from './baseentity';

export class ActionLog extends StrategyBaseEntity {
  userId: string;
  action: string;

  constructor(userId: string, action: string) {
    super();

    this.userId = userId;
    this.action = action;
  }
}
