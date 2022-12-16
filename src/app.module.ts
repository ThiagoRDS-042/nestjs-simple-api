import { PostModule } from '@modules/author/author.module';
import { AuthorModule } from '@modules/post/author.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [AuthorModule, PostModule],
  controllers: [AppController],
})
export class AppModule {}
