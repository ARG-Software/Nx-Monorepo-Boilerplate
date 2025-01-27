import { MainBaseEntity } from '@nx-template/domain';
import { User } from '@nx-template/domain';
import { EntitySchema } from '@mikro-orm/core';
import { mainBaseSchema } from './base.configuration';

export const userSchema = new EntitySchema<User, MainBaseEntity>({
  class: User,
  extends: mainBaseSchema,
  schema: 'app',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', unique: true },
    password: { type: 'string' },
    active: { type: 'boolean', default: true },
    verificationCode: { type: 'string', nullable: true },
    isVerified: { type: 'boolean', default: false },
    resetPasswordCode: { type: 'number', nullable: true },
    resetPasswordExpiration: { type: 'Date', nullable: true },
    mintAddress: { type: 'string', unique: true, nullable: true },
    publicKey: { type: 'string', unique: true, nullable: true },
  },
});
