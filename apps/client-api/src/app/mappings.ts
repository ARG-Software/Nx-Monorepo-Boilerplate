import { User } from '@nx-template/domain';
import { AuthenticatedUserResponseDto, UserDto } from '@nx-template/dtos';

declare module '@nx-template/domain' {
  interface User {
    toUserDto(): UserDto;
    toUserAuthenticatedUserDto(): AuthenticatedUserResponseDto;
  }
}

User.prototype.toUserDto = function (this: User): UserDto {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
};

User.prototype.toUserAuthenticatedUserDto = function (
  this: User
): AuthenticatedUserResponseDto {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    isVerified: this.isVerified,
  };
};
