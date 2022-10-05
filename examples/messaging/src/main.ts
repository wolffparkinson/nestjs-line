/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const port = process.env.PORT || 3333;
  await app.listen(port);
  // app.useGlobalPipes(new ValidationPipe());
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
