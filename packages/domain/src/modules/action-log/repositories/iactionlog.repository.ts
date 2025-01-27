import { ActionLog } from '@nx-template/domain';

export interface IActionLogRepository {
  create(actionLog: ActionLog): Promise<string>;
}

export const IActionLogRepository = Symbol('IActionLogRepository');
