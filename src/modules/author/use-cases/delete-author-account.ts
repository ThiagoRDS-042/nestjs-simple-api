import { Injectable } from '@nestjs/common';

import { AuthorsRepository } from '../repositories/authors-repository';
import { AuthorNotFound } from './errors/author-not-found';

interface IRequest {
  authorId: string;
}

@Injectable()
export class DeleteAuthorAccount {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(data: IRequest): Promise<void> {
    const { authorId } = data;

    const author = await this.authorsRepository.findById(authorId);

    if (!author) {
      throw new AuthorNotFound();
    }

    author.delete();

    await this.authorsRepository.save(author);
  }
}
