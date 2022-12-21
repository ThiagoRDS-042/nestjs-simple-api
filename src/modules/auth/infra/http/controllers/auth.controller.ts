import { Response } from 'express';

import { AuthenticateAuthorAccount } from '@modules/auth/use-cases/authenticate-author-account';
import { AuthorViewModel } from '@modules/author/infra/http/view-models/author-view-model';
import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthBody } from '../dtos/auth-body';

@Controller('auth')
export class AuthController {
  constructor(private authenticateAuthorAccount: AuthenticateAuthorAccount) {}

  @Post('/')
  async auth(@Body() body: AuthBody, @Res() response: Response) {
    const { email, password } = body;

    const { access_token, author } =
      await this.authenticateAuthorAccount.execute({
        email,
        password,
      });

    return response
      .status(200)
      .json({ author: AuthorViewModel.toHTTP(author), access_token });
  }
}
