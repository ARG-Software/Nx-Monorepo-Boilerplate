import { Injectable, Inject } from '@nestjs/common';
import {
  IConfirmationCodeEmail,
  IEmailService,
  IOrderCreatedEmail,
  IOrderCreatedFailEmail,
  IResetPasswordEmail,
} from './email.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ILogger } from '@nx-template/log';

@Injectable()
export class EmailService implements IEmailService {
  constructor(
    @InjectQueue('emails') private readonly emailQueue: Queue,
    @Inject(ILogger) private readonly logger: ILogger
  ) {
    this.logger.createChildLogger(this.constructor.name);
  }

  async sendConfirmationCodeEmail(
    options: IConfirmationCodeEmail
  ): Promise<boolean> {
    console.log(options);
    this.logger.debug('Sending confirmation code email', options);
    try {
      await this.emailQueue.add('confirmation-code', options);
      this.logger.debug('Email confirmation code sent');
      return true;
    } catch (error) {
      this.logger.error('Error sending confirmation code email', error);
      return false;
    }
  }

  async sendResetPasswordEmail(options: IResetPasswordEmail): Promise<boolean> {
    this.logger.debug('Sending reset password email', options);
    try {
      await this.emailQueue.add('reset-password', options);
      this.logger.debug('Email reset password sent');
      return true;
    } catch (error) {
      this.logger.error('Error sending reset password email', error);
      return false;
    }
  }

  async sendOrderCreatedEmail(
    options: IOrderCreatedFailEmail
  ): Promise<boolean> {
    this.logger.debug('Sending order created email', options);
    try {
      await this.emailQueue.add('order-created', options);
      this.logger.debug('Email order created sent');
      return true;
    } catch (error) {
      this.logger.error('Error sending order created email', error);
      return false;
    }
  }

  async sendOrderCreatedFailEmail(
    options: IOrderCreatedEmail
  ): Promise<boolean> {
    this.logger.debug('Sending order created fail email', options);
    try {
      await this.emailQueue.add('order-created-fail', options);
      this.logger.debug('Email order created fail sent');
      return true;
    } catch (error) {
      this.logger.error('Error sending order created fail email', error);
      return false;
    }
  }
}
