import { Injectable } from '@nestjs/common';

import { Post } from '../entities/post.entity';
import { PostsRepository } from '../repositories/posts-repository';

interface IRequest {
  categoryEq?: string;
  titleContains?: string;
  authorIdEq?: string;
}

@Injectable()
export class ListPosts {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: IRequest): Promise<Post[]> {
    const { authorIdEq, categoryEq, titleContains } = data;

    const posts = await this.postsRepository.findMany({
      categoryEq,
      authorIdEq,
      titleContains,
    });

    return posts;
  }
}
