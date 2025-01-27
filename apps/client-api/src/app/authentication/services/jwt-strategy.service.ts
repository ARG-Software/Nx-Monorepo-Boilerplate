import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@nx-template/domain';
import { TokenPayload } from './jwt-strategy.interfaces';
import { GetUserByIdQuery, IBus } from '@nx-template/application';
import { ConfigurationService } from '@nx-template/configuration';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IBus) private readonly bus: IBus,
    private readonly configService: ConfigurationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookie = request.headers.cookie;
          try {
            const token = cookie
              .split(';')
              .find((c) => c.trim().startsWith('Authorization='))
              ?.split('=')[1];

            return token || null;
          } catch (error) {
            return null;
          }
        },
      ]),
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: TokenPayload) {
    if (payload == null) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const query = new GetUserByIdQuery(payload.userId);
    const userResult = await this.bus.query<User>(query);

    if (userResult.isFailure()) {
      throw new UnauthorizedException('Unauthorized user');
    }

    return userResult.getValue();
  }
}
