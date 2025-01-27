import { User } from '../../..';

export interface IUserRepository {
  getAll(): Promise<Partial<User>[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  add(user: User): Promise<string>;
  update(user: User): Promise<void>;
}

export const IUserRepository = Symbol('IUserRepository');
