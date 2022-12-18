import { AppError } from '@shared/errors/app-error';

import { PostsRepository } from '@modules/post/repositories/posts-repository';
import { Injectable } from '@nestjs/common';

import { AuthorsRepository } from '../repositories/authors-repository';

interface IRequest {
  authorId: string;
}

@Injectable()
export class DeleteAuthorAccount {
  constructor(
    private authorsRepository: AuthorsRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute(data: IRequest): Promise<void> {
    const { authorId } = data;

    const author = await this.authorsRepository.findById(authorId);

    if (!author) {
      throw new AppError('Author does not exists', 'AUTHOR_NOT_FOUND', 404);
    }

    author.delete();

    await this.authorsRepository.save(author);

    const posts = await this.postsRepository.findMany({ authorIdEq: authorId });

    await Promise.all(
      posts.map((post) => {
        post.delete();

        return this.postsRepository.save(post);
      }),
    );
  }
}
