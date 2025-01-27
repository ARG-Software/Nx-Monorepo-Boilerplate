import { MainBaseEntity } from './baseentity';

export class User extends MainBaseEntity {
  email: string;
  password: string;
  name: string;
  active: boolean;
  verificationCode: string | null;
  isVerified: boolean;
  resetPasswordCode: string | null;
  resetPasswordExpiration: Date | null;
  mintAddress: string | null;
  publicKey: string | null;

  constructor(
    email: string,
    name: string,
    password: string,
    verificationCode: string,
    isVerified: boolean
  ) {
    super();
    this.email = email;
    this.password = password;
    this.name = name;
    this.active = false;
    this.verificationCode = verificationCode;
    this.isVerified = isVerified;
    this.resetPasswordCode = null;
    this.resetPasswordExpiration = null;
  }
}
