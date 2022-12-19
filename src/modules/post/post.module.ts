import { DatabaseModule } from '@shared/infra/database/database.module';

import { Module } from '@nestjs/common';

import { PostController } from './infra/http/controllers/post-controller';
import { DeletePost } from './use-cases/delete-post';
import { GetPost } from './use-cases/get-post';
import { ListPosts } from './use-cases/list-posts';
import { PublishNewPost } from './use-cases/publish-new-post';
import { UpdatePost } from './use-cases/update-post';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [PublishNewPost, UpdatePost, GetPost, ListPosts, DeletePost],
})
export class PostModule {}
