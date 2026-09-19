import { ActionLog } from '../entities/actionlog';

export interface IActionLogRepository {
  create(actionLog: ActionLog): Promise<string>;
}

export const IActionLogRepository = Symbol('IActionLogRepository');
