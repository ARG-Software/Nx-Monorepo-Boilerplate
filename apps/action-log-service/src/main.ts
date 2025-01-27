import { NestFactory } from '@nestjs/core';
import { ConfigurationService } from '@nx-template/configuration';
import { LogService } from '@nx-template/log';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigurationService);

    app.use(helmet());

    const globalPrefix = 'action-log';
    app.setGlobalPrefix(globalPrefix);

    app.useLogger(app.get(LogService));

    const port = configService.serverPort;
    await app.listen(port ?? 3002);

    console.log(`🚀 Application is running on: http://localhost:${port}`);
  } catch (err) {
    console.error('Failed to start server', err);
    throw err;
  }
}
bootstrap();
