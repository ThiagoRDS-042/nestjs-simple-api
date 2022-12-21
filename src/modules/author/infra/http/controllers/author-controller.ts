import { Response } from 'express';

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

import { CreateAuthorAccountBody } from '../dtos/create-author-account-body';
import { ListAuthorsAccountQuery } from '../dtos/list-authors-account-query';
import { UpdateAuthorAccountBody } from '../dtos/update-author-account-body';
import { AuthorViewModel } from '../view-models/author-view-model';

@Controller('/authors')
export class AuthorController {
  constructor(
    private createAuthorAccount: CreateAuthorAccount,
    private updateAuthorAccount: UpdateAuthorAccount,
    private getAuthorAccount: GetAuthorAccount,
    private listAuthorsAccount: ListAuthorsAccount,
    private deleteAuthorAccount: DeleteAuthorAccount,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Delete('/:authorId')
  async delete(@Param('authorId') authorId: string, @Res() response: Response) {
    await this.deleteAuthorAccount.execute({ authorId });
    return response.status(204).json();
  }
}
