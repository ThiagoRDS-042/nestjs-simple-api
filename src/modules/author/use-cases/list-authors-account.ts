import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { AuthorsRepository } from '../repositories/authors-repository';

interface IRequest {
  emailContains?: string;
  nameContains?: string;
}

@Injectable()
export class ListAuthorsAccount {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute({ emailContains, nameContains }: IRequest): Promise<Author[]> {
    const authors = await this.authorsRepository.findMany({
      emailContains,
      nameContains,
    });

    return authors;
  }
}
