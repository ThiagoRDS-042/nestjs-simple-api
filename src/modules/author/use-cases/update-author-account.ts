import { hash } from 'bcryptjs';

import { Injectable } from '@nestjs/common';

import { Author } from '../entities/author.entity';
import { Phone } from '../entities/phone';
import { AuthorsRepository } from '../repositories/authors-repository';
import { AuthorNotFound } from './errors/author-not-found';
import { EmailAlreadyUsed } from './errors/email-already-used';

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
      throw new AuthorNotFound();
    }

    const authorEmailExist = await this.authorsRepository.findByEmail(email);

    if (authorEmailExist && authorEmailExist.id !== authorExist.id) {
      throw new EmailAlreadyUsed();
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
