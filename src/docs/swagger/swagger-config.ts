import { DocumentBuilder } from '@nestjs/swagger';

const port = process.env.SERVER_PORT || 3333;

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Authors API')
  .setDescription('This is a simple boilerplate for nestjs')
  .addServer(`http://localhost:${port}`, 'Server of development', {})
  .setVersion('1.0')
  .addTag('HealthCheck', 'Return api status')
  .addTag('Auth', 'Authenticate authors')
  .addTag('Authors', 'Create, update, get, list and delete authors')
  .addTag('Posts', 'Create, update, get, list and delete posts')
  .build();
