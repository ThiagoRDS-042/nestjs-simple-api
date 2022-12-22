import { Injectable } from '@nestjs/common';

import { Post } from '../entities/post.entity';
import { PostsRepository } from '../repositories/posts-repository';

interface IRequest {
  categoryEquals?: string;
  titleContains?: string;
  authorIdEquals?: string;
}

@Injectable()
export class ListPosts {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: IRequest): Promise<Post[]> {
    const { authorIdEquals, categoryEquals, titleContains } = data;

    const posts = await this.postsRepository.findMany({
      authorIdEquals,
      categoryEquals,
      titleContains,
    });

    return posts;
  }
}
