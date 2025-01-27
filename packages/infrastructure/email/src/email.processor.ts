import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { ConfigurationService } from '@nx-template/configuration';
import {
  IConfirmationCodeEmail,
  IOrderCreatedEmail,
  IOrderCreatedFailEmail,
  IResetPasswordEmail,
} from './email.interface';
import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import { ILogger } from '@nx-template/log';

@Processor('emails')
export class EmailProcessor {
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigurationService,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  @Process('confirmation-code')
  async sendConfirmationCodeEmail(job: Job<IConfirmationCodeEmail>) {
    this.logger.debug('Sending confirmation code email', job.data);
    const { to, data } = job.data;
    try {
      await this.mailService.sendMail({
        from: this.configService.smtpEmail,
        to,
        subject: 'Confirmation code',
        template: 'emailcodeconfirmation',
        context: {
          confirmationCode: data.confirmationCode,
        },
        attachments: [
          {
            filename: 'logo.svg',
            path: `${__dirname}/assets/images/logo.svg`,
            cid: 'logo',
          },
        ],
      });
      this.logger.debug('Email sent');
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw new Error('Error sending confirmation code email');
    }
  }

  @Process('reset-password')
  async sendResetPasswordEmail(job: Job<IResetPasswordEmail>) {
    this.logger.debug('Sending reset password email', job.data);
    const { to, data } = job.data;
    try {
      await this.mailService.sendMail({
        from: this.configService.smtpEmail,
        to,
        subject: 'Reset password code',
        template: 'resetpassword',
        context: {
          resetCode: data.resetCode,
        },
        attachments: [
          {
            filename: 'logo.svg',
            path: `${__dirname}/assets/images/logo.svg`,
            cid: 'logo',
          },
        ],
      });
      this.logger.debug('Email sent');
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw new Error('Error sending reset password email');
    }
  }

  @Process('order-created')
  async sendCreatedOrderSuccessfulEmail(job: Job<IOrderCreatedEmail>) {
    this.logger.debug('Sending successfully order created email', job.data);
    const { to, data } = job.data;
    try {
      await this.mailService.sendMail({
        from: this.configService.smtpEmail,
        to,
        subject: `Order #${data.exchangeOrderId} created`,
        template: 'ordercreatedsuccess',
        context: {
          exchangeOrderId: data.exchangeOrderId,
          exchangeOrderMessage: data.exchangeOrderMessage,
          symbol: data.symbol,
          action: data.action,
          type: data.type,
          quantity: data.quantity,
          price: data.price,
          triggerTime: data.triggerTime,
          executedTime: data.executedTime,
        },
        attachments: [
          {
            filename: 'logo.svg',
            path: `${__dirname}/assets/images/logo.svg`,
            cid: 'logo',
          },
        ],
      });
      this.logger.debug('Email sent');
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw new Error('Error sending order created email');
    }
  }

  @Process('order-created-fail')
  async sendCreatedOrderFailEmail(job: Job<IOrderCreatedFailEmail>) {
    this.logger.debug('Sending failed order created email', job.data);
    const { to, data } = job.data;
    try {
      await this.mailService.sendMail({
        from: this.configService.smtpEmail,
        to,
        subject: `Order failed to create`,
        template: 'ordercreatedfail',
        context: {
          exchangeOrderId: data.exchangeOrderId,
          exchangeOrderMessage: data.exchangeOrderMessage,
          symbol: data.symbol,
          action: data.action,
          type: data.type,
          quantity: data.quantity,
          price: data.price,
          triggerTime: data.triggerTime,
          executedTime: data.executedTime,
        },
        attachments: [
          {
            filename: 'logo.svg',
            path: `${__dirname}/assets/images/logo.svg`,
            cid: 'logo',
          },
        ],
      });
      this.logger.debug('Email sent');
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw new Error('Error sending order created email');
    }
  }
}
