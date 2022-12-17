import { AuthorModule } from '@modules/author/author.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthorModule],
})
export class HTTPModule {}
