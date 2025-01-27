import { ConfirmCodeCommandHandler } from './usecases/auth/commands/confirmcode.command';
import { GenerateCodeCommandHandler } from './usecases/auth/commands/generatecode.command';
import { GenerateResetPasswordCodeCommandHandler } from './usecases/auth/commands/generateresetpasswordcode.command';
import { ResetPasswordCommandHandler } from './usecases/auth/commands/resetpassword.command';
import { CreateUserCommandHandler } from './usecases/users/commands/createuser.command';
import { GetUserByEmailQueryHandler } from './usecases/users/queries/getuserbyemail.query';
import { GetUserByIdQueryHandler } from './usecases/users/queries/getuserbyid.query';
import { GetUsersListQueryHandler } from './usecases/users/queries/getuserslist.query';

/* #################### AUTH #################### */

export * from './usecases/auth/commands/confirmcode.command';
export * from './usecases/auth/commands/generatecode.command';
export * from './usecases/auth/commands/resetpassword.command';
export * from './usecases/auth/commands/generateresetpasswordcode.command';

const authHandlers = [
  ConfirmCodeCommandHandler,
  GenerateCodeCommandHandler,
  ResetPasswordCommandHandler,
  GenerateResetPasswordCodeCommandHandler,
];

export * from './usecases/users/commands/createuser.command';
export * from './usecases/users/queries/getuserbyemail.query';
export * from './usecases/users/queries/getuserbyid.query';
export * from './usecases/users/queries/getuserslist.query';

const usersHandlers = [
  CreateUserCommandHandler,
  GetUserByEmailQueryHandler,
  GetUserByIdQueryHandler,
  GetUsersListQueryHandler,
];

export const mainApihandlers = [...authHandlers, ...usersHandlers];

export * from './main-application.module';
