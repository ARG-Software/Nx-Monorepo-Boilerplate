import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  BadRequestException,
  Res,
  UseGuards,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ConfirmCodeCommand,
  CreateActionLogMessage,
  CreateActionLogMessagePayload,
  CreateUserCommand,
  GenerateCodeCommand,
  GenerateResetPasswordCodeCommand,
  GetUserByEmailQuery,
  GetUserByIdQuery,
  IBus,
  ResetPasswordCommand,
} from '@nx-template/application';
import { JwtService } from '@nestjs/jwt';
import { ActionLogTypeEnum, User } from '@nx-template/domain';
import { verifyPassword } from './utils';
import JwtAuthenticationGuard from './guards/jwt.authentication.guard';
import { TokenPayload } from './services/jwt-strategy.interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedUserNotVerifiedDto,
  AuthenticatedUserResponseDto,
  ConfirmCodeRequestDto,
  EmailParam,
  LoginRequestDto,
  RegisteredUserResponseDto,
  RegisterRequestDto,
  ResetPasswordRequestDto,
} from '@nx-template/dtos';
import { ILogger } from '@nx-template/log';
import { IEmailService } from '@nx-template/email';
import { ConfigurationService } from '@nx-template/configuration';
import { MessagingProducerService } from '@nx-template/messaging';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  private challenges = new Map<string, number>();

  constructor(
    @Inject(IBus) private readonly memoryBus: IBus,
    @Inject(ILogger) private readonly logger: ILogger,
    @Inject(IEmailService) private readonly emailService: IEmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigurationService,
    private readonly producerService: MessagingProducerService
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  @ApiResponse({
    status: 201,
    description: 'The request has succeeded and the user is registered.',
  })
  @ApiResponse({
    status: 409,
    description: 'The request has failed a user already exists.',
  })
  @ApiResponse({
    status: 500,
    description: 'The request has failed due to a server error.',
  })
  @Post('register')
  async register(
    @Body() body: RegisterRequestDto
  ): Promise<RegisteredUserResponseDto> {
    const registerUserCommand = await this.memoryBus.commandCreate(
      new CreateUserCommand(body.email, body.name, body.password)
    );

    if (registerUserCommand.isFailure()) {
      throw registerUserCommand.getError();
    }

    const userId = registerUserCommand.getValue();

    const userQuery = await this.memoryBus.query<User>(
      new GetUserByIdQuery(userId)
    );

    if (userQuery.isFailure()) {
      throw userQuery.getError();
    }

    const user = userQuery.getValue();

    const emailSent = await this.emailService.sendConfirmationCodeEmail({
      to: user.email,
      data: {
        confirmationCode: user.verificationCode,
      },
    });

    if (!emailSent) {
      throw new InternalServerErrorException(
        'Error sending email. User registered but email not sent. Please contact support.'
      );
    }

    const result: RegisteredUserResponseDto = {
      id: userId,
    };

    const messagePayload: CreateActionLogMessagePayload = {
      userId,
      action: ActionLogTypeEnum.REGISTER,
    };
    const message = new CreateActionLogMessage([messagePayload]);

    await this.producerService.produce(message);

    return result;
  }

  @ApiResponse({
    status: 200,
    description: 'The request has succeeded and the user is verified.',
    type: AuthenticatedUserResponseDto,
  })
  @ApiResponse({
    status: 202,
    description: 'The request has been accepted but the user is not verified.',
    type: AuthenticatedUserNotVerifiedDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Authentication failed.',
  })
  @Post('login')
  async login(
    @Body() body: LoginRequestDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthenticatedUserResponseDto | AuthenticatedUserNotVerifiedDto> {
    this.logger.info('Login request received', body);
    const email = body.email;
    const password = body.password;

    const userQuery = await this.memoryBus.query<User>(
      new GetUserByEmailQuery(email)
    );

    if (userQuery.isFailure()) {
      this.logger.error('Error getting user by email', userQuery.getError());
      throw userQuery.getError();
    }

    const user = userQuery.getValue();

    if (user.isVerified === false) {
      const result: AuthenticatedUserNotVerifiedDto = {
        id: user.id,
        isVerified: false,
      };

      this.logger.info('User not verified', result);
      return result;
    }

    const userId = user.id;

    const payload: TokenPayload = {
      userId,
      userEmail: user.email,
      userName: user.name,
    };

    let token;

    try {
      token = this.jwtService.sign(payload);
    } catch (error) {
      this.logger.error('Error signing token', error);
      throw new BadRequestException('Authentication failed');
    }

    const isPasswordMatching = await verifyPassword(password, user.password);

    if (!isPasswordMatching) {
      this.logger.error('Password does not match');
      throw new BadRequestException('Password does not match');
    }

    const expirationTimeFromConfiguration =
      this.configService.jwtExpirationTime;

    const currentTimeMs = Date.now();
    const expirationTimeMs =
      currentTimeMs +
      this.parseDurationToMilliseconds(expirationTimeFromConfiguration);

    const timezoneOffsetMinutes = new Date().getTimezoneOffset();
    const timezoneOffsetMilliseconds = timezoneOffsetMinutes * 60 * 1000;

    const expirationDate = new Date(
      expirationTimeMs - timezoneOffsetMilliseconds
    );

    const expirationDateUTC = new Date(
      expirationDate.toUTCString()
    ).toUTCString();

    const cookieValue =
      `Authorization=${token}; ` +
      `Expires=${expirationDateUTC}; ` +
      `Path=/; ` +
      `SameSite=None; ` +
      `Secure=true; ` +
      `HttpOnly`;

    response.setHeader('Set-Cookie', cookieValue);

    user.password = undefined;

    const result = user.toUserAuthenticatedUserDto();

    this.logger.info('User authenticated', result);

    const messagePayload: CreateActionLogMessagePayload = {
      userId,
      action: ActionLogTypeEnum.LOGIN,
    };
    const message = new CreateActionLogMessage([messagePayload]);

    await this.producerService.produce(message);

    response.status(200).send(result);
  }

  @Get('generateConfirmationCode/:email')
  async generateConfirmationCode(@Param() params: EmailParam) {
    const { email } = params;
    if (!email) {
      throw new BadRequestException('Email not passed');
    }

    const result = await this.memoryBus.commandCreate(
      new GenerateCodeCommand(email)
    );

    this.logger.debug('Generate confirmation code request received');

    if (result.isFailure()) {
      throw result.getError();
    }

    this.logger.info('Confirmation code generated', result.getValue());

    const code = result.getValue().toString();

    const emailSent = await this.emailService.sendConfirmationCodeEmail({
      to: email,
      data: {
        confirmationCode: code,
      },
    });

    this.logger.info('Email sent', emailSent);

    if (!emailSent) {
      throw new InternalServerErrorException(
        'Error sending email. Please try again later'
      );
    }

    return true;
  }

  @Post('validateCode')
  async validateCode(@Body() body: ConfirmCodeRequestDto) {
    const command = new ConfirmCodeCommand(body.code, body.email);
    const result = await this.memoryBus.commandCreate(command);

    if (result.isFailure()) {
      throw result.getError();
    } else {
      return true;
    }
  }

  @Get('generateResetPasswordCode/:email')
  async generateResetPasswordCode(
    @Param() params: EmailParam
  ): Promise<boolean> {
    const { email } = params;
    if (!email) {
      throw new BadRequestException('Email not passed');
    }

    const result = await this.memoryBus.commandCreate(
      new GenerateResetPasswordCodeCommand(email)
    );

    if (result.isFailure()) {
      throw result.getError();
    }

    const code = result.getValue();

    const emailSent = await this.emailService.sendResetPasswordEmail({
      to: email,
      data: {
        resetCode: code,
      },
    });

    if (!emailSent) {
      throw new InternalServerErrorException('Error sending email');
    }

    return true;
  }

  @Post('resetPassword')
  async resetPassword(@Body() body: ResetPasswordRequestDto) {
    const result = await this.memoryBus.commandCreate(
      new ResetPasswordCommand(body.email, body.password, body.code)
    );

    if (result.isFailure()) {
      throw result.getError();
    }

    return true;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('logout')
  async logOut(
    @Res({ passthrough: true }) response: Response
  ): Promise<boolean> {
    response.clearCookie('Authorization');
    return true;
  }

  private parseDurationToMilliseconds(duration: string): number {
    let value: number;
    let unit: string;
    try {
      value = parseInt(duration);
      unit = duration.slice(-1);
    } catch (error) {
      throw new Error('Invalid duration format');
    }

    switch (unit) {
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'm':
        return value * 60 * 1000;
      case 's':
        return value * 1000;
      default:
        throw new Error('Invalid duration format');
    }
  }

  @Get('get-challenge')
  async getChallenge(@Res() res: Response): Promise<void> {
    const challenge = `Verify-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.challenges.set(challenge, Date.now());
    res.status(200).json({ challenge });
  }
}
