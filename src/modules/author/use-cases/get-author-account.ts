import { AppError } from '@shared/errors/app-error';

import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { AuthorsRepository } from '../repositories/authors-repository';

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
      throw new AppError('Author does not exists', 'AUTHOR_NOT_FOUND', 404);
    }

    return author;
  }
}
