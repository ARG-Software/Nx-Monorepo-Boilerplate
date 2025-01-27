import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {
  ConfigurationModule,
  ConfigurationService,
} from '@nx-template/configuration';
import { EmailProcessor } from './email.processor';
import { IEmailService } from './email.interface';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        transport: {
          host: configService.smtpHost,
          port: configService.smtpPort,
          secure: false,
          auth: {
            user: configService.smtpEmail,
            pass: configService.smtpPass,
          },
        },
        defaults: {
          from: configService.smtpEmail,
        },
        template: {
          dir: join(__dirname, 'assets/emails'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigurationService],
    }),
  ],
  providers: [
    {
      provide: IEmailService,
      useClass: EmailService,
    },
    EmailProcessor,
  ],
  exports: [IEmailService],
})
export class EmailModule {}
