import { Injectable } from '@nestjs/common';
import { ConfigService as NestedConfig } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: NestedConfig) {}

  private get(key: string): string {
    const value = process.env[key] ?? this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Config error: ${key} is not defined`);
    }
    return value;
  }

  private getArray(key: string): string[] {
    const value = process.env[key] ?? this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Config error: ${key} is not defined`);
    }
    return value.split(',');
  }

  private getBoolean(key: string): boolean {
    const value = process.env[key] ?? this.configService.get(key);
    if (!value) {
      throw new Error(`Config error: ${key} is not defined`);
    }
    return value === 'true';
  }

  private getNumber(key: string): number {
    const value = process.env[key] ?? this.configService.get(key);
    if (!value) {
      throw new Error(`Config error: ${key} is not defined`);
    }

    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      console.log(`Config error: ${key} is not a valid number`);
      throw new Error(`Config error: ${key} is not a valid number`);
    }
    return parsedValue;
  }

  // Typed getters for each configuration property
  get jwtSecret(): string {
    return this.get('JWT_SECRET');
  }

  get jwtExpirationTime(): string {
    return this.get('JWT_EXPIRATION_TIME');
  }

  get logLevel(): string {
    const logLevel = this.get('LOG_LEVEL');
    if (!['debug', 'info', 'warn', 'error'].includes(logLevel)) {
      throw new Error(`Config error: LOG_LEVEL is not a valid log level`);
    }
    return logLevel as 'debug' | 'info' | 'warn' | 'error';
  }

  get logTo(): string {
    const logTo = this.get('LOG_TO');
    if (!['console', 'kafka', 'loggly', 'errsole'].includes(logTo)) {
      return 'console';
    }
    return logTo;
  }

  get logglyToken(): string {
    return this.get('LOGGLY_TOKEN');
  }

  get logglySubdomain(): string {
    return this.get('LOGGLY_SUBDOMAIN');
  }

  get logglyTags(): string {
    return this.get('LOGGLY_TAGS');
  }

  get databasePort(): number {
    return this.getNumber('DATABASE_PORT');
  }

  get databaseUser(): string {
    return this.get('DATABASE_USER');
  }

  get databaseHost(): string {
    return this.get('DATABASE_HOST');
  }

  get databaseName(): string {
    return this.get('DATABASE_NAME');
  }

  get databasePassword(): string {
    return this.get('DATABASE_PASSWORD');
  }

  get databaseSchema(): string {
    return this.get('DATABASE_SCHEMA');
  }

  get logsDatabasePort(): number {
    return this.getNumber('LOGS_DATABASE_PORT');
  }
  get logsDatabaseUser(): string {
    return this.get('LOGS_DATABASE_USER');
  }
  get logsDatabaseHost(): string {
    return this.get('LOGS_DATABASE_HOST');
  }

  get logsDatabaseName(): string {
    return this.get('LOGS_DATABASE_NAME');
  }

  get logsDatabasePassword(): string {
    return this.get('LOGS_DATABASE_PASSWORD');
  }

  get errsoleDashboardPort(): number {
    return this.getNumber('ERRSOLE_DASHBOARD_PORT');
  }

  get senderName(): string {
    return this.get('SENDER_NAME');
  }

  get smtpHost(): string {
    return this.get('SMTP_HOST');
  }

  get smtpPort(): number {
    return this.getNumber('SMTP_PORT');
  }

  get smtpPass(): string {
    return this.get('SMTP_PASS');
  }

  get smtpEmail(): string {
    return this.get('SMTP_EMAIL');
  }

  get kafkaBroker(): string {
    return this.get('KAFKA_BROKER');
  }

  get serverPort(): number {
    return this.getNumber('SERVER_PORT');
  }

  get secretKey(): string {
    return this.get('SECRET_KEY');
  }

  get redisHost(): string {
    return this.get('REDIS_HOST');
  }

  get redisPort(): number {
    return this.getNumber('REDIS_PORT');
  }

  get redisPassword(): string {
    return this.get('REDIS_PASSWORD');
  }

  get redisDatabase(): number {
    return this.getNumber('REDIS_DATABASE');
  }

  get ipWhitelist(): string[] {
    return this.getArray('IP_WHITELIST');
  }

  get useTestNet(): boolean {
    return this.getBoolean('TEST_NET');
  }

  get environment(): string {
    return this.get('NODE_ENV');
  }
}
