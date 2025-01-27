export class AuthenticatedUserResponseDto {
  email: string;
  name: string;
  id: string;
  isVerified: boolean;
}

export class AuthenticatedUserNotVerifiedDto {
  id: string;
  isVerified: boolean;
}

export class RegisteredUserResponseDto {
  id: string;
}
