import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategyService } from './services/jwt-strategy.service';
import { JwtModule } from '@nestjs/jwt';
import JwtAuthenticationGuard from './guards/jwt.authentication.guard';
import { ConfigurationService } from '@nx-template/configuration';
import { EmailModule } from '@nx-template/email';
import { MessagingModule } from '@nx-template/messaging';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExpirationTime,
        },
      }),
      inject: [ConfigurationService],
    }),
    MessagingModule,
    EmailModule,
  ],
  providers: [JwtStrategyService, JwtAuthenticationGuard],
  controllers: [AuthenticationController],
  exports: [JwtAuthenticationGuard],
})
export class AuthenticationModule {}
