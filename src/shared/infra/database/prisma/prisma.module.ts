import { PrismaAuthorsRepository } from '@modules/author/infra/prisma/repositories/prisma-authors-repository';
import { AuthorsRepository } from '@modules/author/repositories/authors-repository';
import { PrismaPostsRepository } from '@modules/post/infra/prisma/repositories/prisma-posts-repository';
import { PostsRepository } from '@modules/post/repositories/posts-repository';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    { provide: AuthorsRepository, useClass: PrismaAuthorsRepository },
    { provide: PostsRepository, useClass: PrismaPostsRepository },
  ],
  exports: [AuthorsRepository, PostsRepository],
})
export class PrismaModule {}
