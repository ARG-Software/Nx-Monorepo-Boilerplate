export interface ICache {
  get(prefix: string, key: string): Promise<any>;
  set(prefix: string, key: string, value: any): Promise<void>;
  del(prefix: string, key: string): Promise<void>;
}

export const ICache = Symbol('ICache');
