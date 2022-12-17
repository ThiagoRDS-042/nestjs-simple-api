import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { AuthorsRepository } from '../repositories/authors-repository';
import { AuthorNotFound } from './errors/author-not-found';

interface IRequest {
  authorId: string;
}

@Injectable()
export class GetAuthorAccount {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(data: IRequest): Promise<Author> {
    const { authorId } = data;

    const author = await this.authorsRepository.findById(authorId);

    if (!author) {
      throw new AuthorNotFound();
    }

    return author;
  }
}
