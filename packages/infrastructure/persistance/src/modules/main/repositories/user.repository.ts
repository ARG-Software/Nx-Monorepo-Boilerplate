import { EntityManager, EntityRepository, t } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UnableToAddUserError,
  UnableToDeleteUserError,
  UnableToFindUserByEmailAndPasswordError,
  UnableToFindUserByEmailError,
  UnableToFindUserByIdError,
  UnableToFindUserByMintAddressError,
  UnableToGetAllUsersError,
  UnableToUpdateUserError,
  User,
} from '@nx-template/domain';
import { userSchema } from '../configurations/user.configuration';
import { ILogger } from '@nx-template/log';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly _repository: EntityRepository<User>;

  constructor(
    private readonly em: EntityManager,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this._repository = this.em.getRepository(userSchema);
    logger.createChildLogger(this.constructor.name);
  }

  async getAll(): Promise<Partial<User>[]> {
    try {
      const users = await this._repository.findAll();
      return users.map(({ name, email, createdAt }) => ({
        name,
        email,
        createdAt,
      }));
    } catch (error: any) {
      this.logger.error('Error getting all users', error);
      throw new UnableToGetAllUsersError();
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this._repository.findOne({ id });
      return user;
    } catch (error: any) {
      this.logger.error(`Error getting user by id: ${id}`, error);
      throw new UnableToFindUserByIdError();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this._repository.findOne({ email });
      return user;
    } catch (error: any) {
      this.logger.error(`Error getting user by email: ${email}`, error);
      throw new UnableToFindUserByEmailError();
    }
  }

  async add(user: User): Promise<string> {
    try {
      let newUser = this._repository.create(user);
      await this._repository.getEntityManager().flush();
      return newUser.id;
    } catch (error: any) {
      this.logger.error('Error adding user', error);
      throw new UnableToAddUserError();
    }
  }

  async update(user: User): Promise<void> {
    try {
      await this.em.nativeUpdate(User, { id: user.id }, user);
    } catch (error: any) {
      this.logger.error('Error updating user', error);
      throw new UnableToUpdateUserError();
    }
  }
}
