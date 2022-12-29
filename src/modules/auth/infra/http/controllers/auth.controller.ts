import { Response } from 'express';

import { CookieConfig } from '@configs/cookie-config';
import { AuthenticateAuthorAccount } from '@modules/auth/use-cases/authenticate-author-account';
import { AuthorResponse } from '@modules/author/infra/http/dtos/author-response';
import { AuthorViewModel } from '@modules/author/infra/http/view-models/author-view-model';
import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthBody } from '../dtos/auth-body';
import { AuthResponse } from '../dtos/auth-response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authenticateAuthorAccount: AuthenticateAuthorAccount) {}

  @ApiOkResponse({
    description: 'The author account has been successfully authenticated.',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'The author credentials are invalids',
    schema: {
      example: {
        message: ['Invalid email or password'],
        code: 'INVALID_CREDENTIALS',
      },
    },
  })
  @Post('/')
  async auth(@Body() body: AuthBody, @Res() response: Response) {
    const { email, password } = body;

    const { accessToken, author } =
      await this.authenticateAuthorAccount.execute({
        email,
        password,
      });

    return response
      .status(200)
      .json({ author: AuthorViewModel.toHTTP(author), accessToken });
  }

  @ApiOkResponse({
    description: 'The author account has been successfully authenticated.',
    type: AuthorResponse,
  })
  @ApiBadRequestResponse({
    description: 'The author credentials are invalids',
    schema: {
      example: {
        message: ['Invalid email or password'],
        code: 'INVALID_CREDENTIALS',
      },
    },
  })
  @Post('/cookie')
  async authCookie(@Body() body: AuthBody, @Res() response: Response) {
    const { email, password } = body;

    const { accessToken, author } =
      await this.authenticateAuthorAccount.execute({
        email,
        password,
      });

    const { key } = CookieConfig.newCookieConfig();

    response.cookie(key, accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
      secure: true,
      sameSite: 'strict',
    });

    return response
      .status(200)
      .json({ author: AuthorViewModel.toHTTP(author) });
  }

  @ApiNoContentResponse({
    description: 'The author account has been successfully logout.',
  })
  @Post('/logout/cookie')
  async logoutCookie(@Res() response: Response) {
    const { key } = CookieConfig.newCookieConfig();

    response.clearCookie(key);

    return response.status(204).json();
  }
}
