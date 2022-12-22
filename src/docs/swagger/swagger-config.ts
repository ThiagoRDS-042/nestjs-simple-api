import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Authors API')
  .setDescription('The author API description')
  .setVersion('1.0')
  .addTag('Authors', 'description of the tag')
  .addTag('Posts', 'description of the tag')
  .addTag('Auth', 'description of the tag')
  .addTag('HealthCheck', 'description of the tag')
  .build();
