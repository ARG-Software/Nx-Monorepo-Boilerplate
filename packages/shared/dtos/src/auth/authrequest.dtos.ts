import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}

export class RegisterRequestDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;
}

export class ConfirmCodeRequestDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class ResetPasswordRequestDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  password?: string;
}

export class EmailParam {
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class IdParam {
  @IsOptional()
  @IsString()
  id?: string;
}

export class LoginNFTRequestDto {
  publicKey: string;
  signature: number[];
  mintAddress: string;
  challenge: string;
}
