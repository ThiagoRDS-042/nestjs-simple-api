import { HttpException } from '@shared/errors/http-exception';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpException());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
