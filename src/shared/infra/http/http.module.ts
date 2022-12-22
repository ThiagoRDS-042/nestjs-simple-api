import { AuthModule } from '@modules/auth/auth.module';
import { AuthorModule } from '@modules/author/author.module';
import { PostModule } from '@modules/post/post.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthorModule, PostModule, AuthModule],
})
export class HTTPModule {}
