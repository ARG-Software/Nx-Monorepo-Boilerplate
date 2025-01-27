import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigurationService } from '@nx-template/configuration';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const configService = app.get(ConfigurationService);

    app.use(helmet());

    const allowedOrigins = configService.ipWhitelist;

    app.enableCors({
      origin: allowedOrigins,
      methods: 'GET,POST,PUT,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders:
        'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Headers',
      preflightContinue: false,
    });

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    try {
      const port = configService.serverPort;
      await app.listen(port);
      console.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
      );
    } catch (err) {
      console.error('Failed to start server', err);
      throw err;
    }

    app.enableShutdownHooks();
  } catch (err) {
    console.error('Failed to start server', err);
    throw err;
  }
}

bootstrap();
