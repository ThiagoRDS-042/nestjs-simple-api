import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/app-error';

import { jwtConfig } from '@configs/jwt-config';
import { Author } from '@modules/author/entities/author.entity';
import { AuthorsRepository } from '@modules/author/repositories/authors-repository';
import { Injectable } from '@nestjs/common';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  author: Author;
  accessToken: string;
}

@Injectable()
export class AuthenticateAuthorAccount {
  constructor(private authorsRepository: AuthorsRepository) {}

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

    const { algorithm, expiresIn, secretKey } = jwtConfig;

    const payload = { name: author.name, sub: author.id };

    const accessToken = sign(payload, secretKey, {
      algorithm,
      expiresIn,
    });

    return {
      author,
      accessToken,
    };
  }
}
