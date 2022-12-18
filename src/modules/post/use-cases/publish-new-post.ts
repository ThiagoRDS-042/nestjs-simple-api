import { AppError } from '@shared/errors/app-error';

import { AuthorsRepository } from '@modules/author/repositories/authors-repository';
import { Injectable } from '@nestjs/common';

import { Content } from '../entities/content';
import { Post } from '../entities/post.entity';
import { PostsRepository } from '../repositories/posts-repository';

interface IRequest {
  authorId: string;
  content: string;
  title: string;
  category: string;
}

@Injectable()
export class PublishNewPost {
  constructor(
    private postsRepository: PostsRepository,
    private authorsRepository: AuthorsRepository,
  ) {}

  async execute(data: IRequest): Promise<Post> {
    const { authorId, content, title, category } = data;

    const titleALreadyUsed = await this.postsRepository.findByTitle(title);

    if (titleALreadyUsed) {
      throw new AppError('Title already used', 'TITLE_ALREADY_USED', 409);
    }

    const authorExists = await this.authorsRepository.findById(authorId);

    if (!authorExists) {
      throw new AppError('Author does not exists', 'AUTHOR_NOT_FOUND', 404);
    }

    const post = Post.newPost({
      authorId,
      content: Content.newContent(content),
      title,
      category,
    });

    post.publish();

    await this.postsRepository.create(post);

    return post;
  }
}
