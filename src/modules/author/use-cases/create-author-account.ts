import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { Phone } from '../entities/phone';
import { AuthorsRepository } from '../infra/repositories/authors-repository';
import { EmailAlreadyEXists } from './errors/email-already-exists';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Injectable()
export class CreateAuthorAccount {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(data: IRequest): Promise<Author> {
    const { email, name, password, phone } = data;

    const authorALreadyExists = await this.authorsRepository.findByEmail(email);

    if (!authorALreadyExists) {
      throw new EmailAlreadyEXists();
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
