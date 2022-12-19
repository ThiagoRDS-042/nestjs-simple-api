import { HTTPModule } from '@shared/infra/http/http.module';

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

@Module({
  imports: [HTTPModule],
  controllers: [AppController],
})
export class AppModule {}
