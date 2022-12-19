import { Response } from 'express';

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
  async create(@Body() body: CreateAuthorAccountBody, @Res() res: Response) {
    const { email, name, password, phone } = body;

    const author = await this.createAuthorAccount.execute({
      email,
      name,
      password,
      phone,
    });

    return res.status(200).json({ author: AuthorViewModel.toHTTP(author) });
  }

  @Put('/:authorId')
  async save(
    @Param('authorId') authorId: string,
    @Body() body: UpdateAuthorAccountBody,
    @Res() res: Response,
  ) {
    const { email, name, password, phone } = body;

    const author = await this.updateAuthorAccount.execute({
      email,
      name,
      password,
      phone,
      authorId,
    });

    return res.status(200).json({ author: AuthorViewModel.toHTTP(author) });
  }

  @Get('/:authorId')
  async get(@Param('authorId') authorId: string, @Res() res: Response) {
    const author = await this.getAuthorAccount.execute({
      authorId,
    });

    return res.status(200).json({ author: AuthorViewModel.toHTTP(author) });
  }

  @Get('/')
  async list(@Query() query: ListAuthorsAccountQuery, @Res() res: Response) {
    const { emailContains, nameContains } = query;

    const authors = await this.listAuthorsAccount.execute({
      emailContains,
      nameContains,
    });

    return res
      .status(200)
      .json({ authors: authors.map(AuthorViewModel.toHTTP) });
  }

  @Delete('/:authorId')
  async delete(@Param('authorId') authorId: string, @Res() res: Response) {
    await this.deleteAuthorAccount.execute({ authorId });
    return res.status(204).json();
  }
}
