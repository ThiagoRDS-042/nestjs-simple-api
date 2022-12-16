import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { Phone } from '../entities/phone';
import { AuthorsRepository } from '../infra/repositories/authors-repository';
import { AuthorNotFound } from './errors/author-not-found';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Injectable()
export class UpdateAuthorAccount {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(data: IRequest): Promise<Author> {
    const { email, name, password, phone, id } = data;

    const authorExist = await this.authorsRepository.findById(id);

    if (!authorExist) {
      throw new AuthorNotFound();
    }

    const author = new Author({
      email,
      name,
      password,
      phone: new Phone(phone),
    });

    await this.authorsRepository.create(author);

    return author;
  }
}
