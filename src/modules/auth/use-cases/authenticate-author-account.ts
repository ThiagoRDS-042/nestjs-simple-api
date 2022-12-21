import { compare } from 'bcryptjs';

import { AppError } from '@shared/errors/app-error';

import { Author } from '@modules/author/entities/author.entity';
import { AuthorsRepository } from '@modules/author/repositories/authors-repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  author: Author;
  access_token: string;
}

@Injectable()
export class AuthenticateAuthorAccount {
  constructor(
    private authorsRepository: AuthorsRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const { email, password } = data;

    const author = await this.authorsRepository.findByEmail(email);

    if (!author) {
      throw new AppError(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        400,
      );
    }

    const match = await compare(password, author.password);

    if (!match) {
      throw new AppError(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        400,
      );
    }

    const payload = { name: author.name, sub: author.id };

    return {
      author,
      access_token: this.jwtService.sign(payload),
    };
  }
}
