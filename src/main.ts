import { HttpException } from '@shared/errors/http-exception';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerConfig } from './docs/swagger/swagger-config';

async function bootstrap(): Promise<void> {
  const port = process.env.SERVER_POST || 3333;

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpException());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['*'],
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, SwaggerConfig);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, async () =>
    // eslint-disable-next-line no-console
    console.log(`server listening on ${await app.getUrl()}`),
  );
}
bootstrap();
