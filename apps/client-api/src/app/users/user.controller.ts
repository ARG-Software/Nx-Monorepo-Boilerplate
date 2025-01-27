import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { ILogger } from '@nx-template/log';
import { GetUsersListQuery, IBus } from '@nx-template/application';
import { Response } from 'express';
import { User } from '@nx-template/domain';
import JwtAuthenticationGuard from '../authentication/guards/jwt.authentication.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(JwtAuthenticationGuard)
@Controller('user')
export class UserController {
  constructor(
    @Inject(IBus) private readonly bus: IBus,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  @Get()
  async getUsersList(@Res() res: Response) {
    const usersListQueryResult = await this.bus.query<Promise<Partial<User>[]>>(
      new GetUsersListQuery()
    );

    if (usersListQueryResult.isFailure()) {
      const errorMessage = usersListQueryResult.getErrorMessage();
      res.status(401).send(errorMessage);
      return errorMessage;
    }

    res.status(200).send(usersListQueryResult);
  }
}
