import { AppError } from '@shared/errors/app-error';

import { Injectable } from '@nestjs/common';

import { Content } from '../entities/content';
import { Post } from '../entities/post.entity';
import { PostsRepository } from '../repositories/posts-repository';

interface IRequest {
  postId: string;
  content: string;
  title: string;
  category: string;
}

@Injectable()
export class UpdatePost {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: IRequest): Promise<Post> {
    const { postId, content, title, category } = data;

    const postExists = await this.postsRepository.findById(postId);

    if (!postExists) {
      throw new AppError('Post does not exists', 'POST_NOT_FOUND', 404);
    }

    const titleALreadyUsed = await this.postsRepository.findByTitle(title);

    if (titleALreadyUsed && titleALreadyUsed.id !== titleALreadyUsed.id) {
      throw new AppError('Title already used', 'TITLE_ALREADY_USED', 409);
    }

    const post = Post.newPost(
      {
        authorId: postExists.authorId,
        content: Content.newContent(content),
        title,
        category,
      },
      postExists.id,
    );

    await this.postsRepository.save(post);

    return post;
  }
}
