import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { AuthorsRepository } from '../repositories/authors-repository';

@Injectable()
export class ListAuthorsAccount {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(): Promise<Author[]> {
    const authors = await this.authorsRepository.findMany();

    return authors;
  }
}
