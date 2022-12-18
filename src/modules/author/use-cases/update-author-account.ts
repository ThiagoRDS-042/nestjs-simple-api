import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/app-error';

import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { Phone } from '../entities/phone';
import { AuthorsRepository } from '../repositories/authors-repository';

interface IRequest {
  authorId: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Injectable()
export class UpdateAuthorAccount {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute(data: IRequest): Promise<Author> {
    const { email, name, password, phone, authorId } = data;

    const authorExist = await this.authorsRepository.findById(authorId);

    if (!authorExist) {
      throw new AppError('Author does not exists', 'AUTHOR_NOT_FOUND', 404);
    }

    const authorEmailExist = await this.authorsRepository.findByEmail(email);

    if (authorEmailExist && authorEmailExist.id !== authorExist.id) {
      throw new AppError('Email already used', 'EMAIL_ALREADY_USED', 409);
    }

    const passwordEncrypted = await hash(password, 10);

    const author = Author.newAuthor(
      {
        email,
        name,
        password: passwordEncrypted,
        phone: Phone.newPhone(phone),
      },
      authorId,
    );

    await this.authorsRepository.save(author);

    return author;
  }
}
