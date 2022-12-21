import { HttpException } from '@shared/errors/http-exception';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpException());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: '*' });

  await app.listen(3333);
}
bootstrap();
