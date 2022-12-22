import { Response } from 'express';
import { randomUUID } from 'node:crypto';

import {
  CurrentAuth,
  ICurrentAuthResponse,
} from '@modules/auth/infra/decorators/current-auth';
import { JwtAuthGuard } from '@modules/auth/infra/guards/jwt-guard';
import { CreateAuthorAccount } from '@modules/author/use-cases/create-author-account';
import { DeleteAuthorAccount } from '@modules/author/use-cases/delete-author-account';
import { GetAuthorAccount } from '@modules/author/use-cases/get-author-account';
import { ListAuthorsAccount } from '@modules/author/use-cases/list-authors-account';
import { UpdateAuthorAccount } from '@modules/author/use-cases/update-author-account';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthorResponse, AuthorsResponse } from '../dtos/author-response';
import { CreateAuthorAccountBody } from '../dtos/create-author-account-body';
import { ListAuthorsAccountQuery } from '../dtos/list-authors-account-query';
import { UpdateAuthorAccountBody } from '../dtos/update-author-account-body';
import { AuthorViewModel } from '../view-models/author-view-model';

@ApiTags('Authors')
@Controller('/authors')
export class AuthorController {
  constructor(
    private createAuthorAccount: CreateAuthorAccount,
    private updateAuthorAccount: UpdateAuthorAccount,
    private getAuthorAccount: GetAuthorAccount,
    private listAuthorsAccount: ListAuthorsAccount,
    private deleteAuthorAccount: DeleteAuthorAccount,
  ) {}

  @ApiCreatedResponse({
    description: 'The author account has been successfully create.',
    type: AuthorResponse,
  })
  @ApiConflictResponse({
    description: 'The author e-mail has already been used',
    schema: {
      example: {
        message: ['Email already used'],
        code: 'EMAIL_ALREADY_USED',
      },
    },
  })
  @Post('/')
  async create(
    @Body() body: CreateAuthorAccountBody,
    @Res() response: Response,
  ) {
    const { email, name, password, phone } = body;

    const author = await this.createAuthorAccount.execute({
      email,
      name,
      password,
      phone,
    });

    return response
      .status(200)
      .json({ author: AuthorViewModel.toHTTP(author) });
  }

  @ApiOkResponse({
    description: 'The author account has been successfully update.',
    type: AuthorResponse,
  })
  @ApiNotFoundResponse({
    description: 'The author has not found',
    schema: {
      example: {
        message: ['Author does not exists'],
        code: 'AUTHOR_NOT_FOUND',
      },
    },
  })
  @ApiConflictResponse({
    description: 'The author e-mail has already been used',
    schema: {
      example: {
        message: ['Email already used'],
        code: 'EMAIL_ALREADY_USED',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The author not informed of the token',
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @ApiParam({
    name: 'authorId',
    type: String,
    format: 'uuid',
    example: randomUUID(),
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:authorId')
  async save(
    @Param('authorId') authorId: string,
    @Body() body: UpdateAuthorAccountBody,
    @Res() response: Response,
  ) {
    const { email, name, password, phone } = body;

    const author = await this.updateAuthorAccount.execute({
      email,
      name,
      password,
      phone,
      authorId,
    });

    return response
      .status(200)
      .json({ author: AuthorViewModel.toHTTP(author) });
  }

  @ApiOkResponse({
    description: 'The author profile has been successfully found.',
    type: AuthorResponse,
  })
  @ApiNotFoundResponse({
    description: 'The author has not found',
    schema: {
      example: {
        message: ['Author does not exists'],
        code: 'AUTHOR_NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The author not informed of the token',
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(
    @CurrentAuth() currentAuth: ICurrentAuthResponse,
    @Res() response: Response,
  ) {
    const { authorId } = currentAuth;

    const author = await this.getAuthorAccount.execute({
      authorId,
    });

    return response
      .status(200)
      .json({ author: AuthorViewModel.toHTTP(author) });
  }

  @ApiOkResponse({
    description: 'The author account has been successfully found.',
    type: AuthorResponse,
  })
  @ApiNotFoundResponse({
    description: 'The author has not found',
    schema: {
      example: {
        message: ['Author does not exists'],
        code: 'AUTHOR_NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The author not informed of the token',
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @ApiParam({
    name: 'authorId',
    type: String,
    format: 'uuid',
    example: randomUUID(),
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:authorId')
  async get(@Param('authorId') authorId: string, @Res() response: Response) {
    const author = await this.getAuthorAccount.execute({
      authorId,
    });

    return response
      .status(200)
      .json({ author: AuthorViewModel.toHTTP(author) });
  }

  @ApiOkResponse({
    description: 'The authors account has been successfully list.',
    type: AuthorsResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'The author not informed of the token',
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async list(
    @Query() query: ListAuthorsAccountQuery,
    @Res() response: Response,
  ) {
    const { emailContains, nameContains } = query;

    const authors = await this.listAuthorsAccount.execute({
      emailContains,
      nameContains,
    });

    return response
      .status(200)
      .json({ authors: authors.map(AuthorViewModel.toHTTP) });
  }

  @ApiNoContentResponse({
    description: 'The authors account has been successfully delete.',
  })
  @ApiNotFoundResponse({
    description: 'The author has not found',
    schema: {
      example: {
        message: ['Author does not exists'],
        code: 'AUTHOR_NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'The author not informed of the token',
    schema: {
      example: {
        message: 'Unauthorized',
      },
    },
  })
  @ApiParam({
    name: 'authorId',
    type: String,
    format: 'uuid',
    example: randomUUID(),
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:authorId')
  async delete(@Param('authorId') authorId: string, @Res() response: Response) {
    await this.deleteAuthorAccount.execute({ authorId });
    return response.status(204).json();
  }
}
