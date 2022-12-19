import { PrismaService } from '@shared/infra/database/prisma/prisma.service';

import { Post } from '@modules/post/entities/post.entity';
import {
  IFindManyPostsRequest,
  PostsRepository,
} from '@modules/post/repositories/posts-repository';
import { Injectable } from '@nestjs/common';

import { PrismaPostMapper } from '../mappers/prisma-post-mapper';

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}

  async create(post: Post): Promise<void> {
    const raw = PrismaPostMapper.toPrisma(post);

    await this.prisma.post.create({
      data: raw,
    });
  }

  async save(post: Post): Promise<void> {
    const raw = PrismaPostMapper.toPrisma(post);

    await this.prisma.post.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async findByTitle(title: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: {
        title,
      },
    });

    if (!post) {
      return null;
    }

    return PrismaPostMapper.toDomain(post);
  }

  async findById(postId: string): Promise<Post | null> {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
        deletedAt: null,
      },
    });

    if (!post) {
      return null;
    }

    return PrismaPostMapper.toDomain(post);
  }

  async findMany(options: IFindManyPostsRequest): Promise<Post[]> {
    const { authorIdEquals, categoryEquals, titleContains } = options;

    const posts = await this.prisma.post.findMany({
      where: {
        authorId: {
          equals: authorIdEquals,
        },
        category: {
          equals: categoryEquals,
        },
        title: {
          contains: titleContains,
        },
        deletedAt: {
          equals: null,
        },
      },
    });

    return posts.map(PrismaPostMapper.toDomain);
  }
}
