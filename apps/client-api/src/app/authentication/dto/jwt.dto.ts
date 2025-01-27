import { User } from '@nx-template/domain';
import { Request } from '@nestjs/common';

export interface IUserFromJwt extends Request {
  // TODO: find somewhere better to place this
  user: User;
}
