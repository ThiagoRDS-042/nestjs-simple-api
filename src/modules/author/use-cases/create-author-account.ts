import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/app-error';

import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { Phone } from '../entities/phone';
import { AuthorsRepository } from '../repositories/authors-repository';

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

    if (authorALreadyExists) {
      throw new AppError('Email already used', 'EMAIL_ALREADY_USED', 423);
    }

    const passwordEncrypted = await hash(password, 10);

    const author = new Author({
      email,
      name,
      password: passwordEncrypted,
      phone: new Phone(phone),
    });

    await this.authorsRepository.create(author);

    return author;
  }
}
