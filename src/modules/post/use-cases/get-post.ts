import { AppError } from '@shared/errors/app-error';

import { Injectable } from '@nestjs/common';

import { Post } from '../entities/post.entity';
import { PostsRepository } from '../repositories/posts-repository';

interface IRequest {
  postId: string;
}

@Injectable()
export class GetPost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: IRequest): Promise<Post> {
    const { postId } = data;

    const post = await this.postsRepository.findById(postId);

    if (!post) {
      throw new AppError('Post does not exists', 'POST_NOT_FOUND', 404);
    }

    return post;
  }
}
