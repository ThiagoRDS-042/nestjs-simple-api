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
} from '@nestjs/common';

import { CreateAuthorAccountBody } from '../dtos/create-author-account-body';
import { UpdateAuthorAccountBody } from '../dtos/update-author-account-body';
import {
  AuthorViewModel,
  AuthorViewModelResponse,
} from '../view-models/author-view-model';

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
  public async create(
    @Body() body: CreateAuthorAccountBody,
  ): Promise<{ author: AuthorViewModelResponse }> {
    const { email, name, password, phone } = body;

    const author = await this.createAuthorAccount.execute({
      email,
      name,
      password,
      phone,
    });

    return { author: AuthorViewModel.toHTTP(author) };
  }

  @Put('/:authorId')
  async save(
    @Param('authorId') authorId: string,
    @Body() body: UpdateAuthorAccountBody,
  ): Promise<{ author: AuthorViewModelResponse }> {
    const { email, name, password, phone } = body;

    const author = await this.updateAuthorAccount.execute({
      email,
      name,
      password,
      phone,
      authorId,
    });

    return { author: AuthorViewModel.toHTTP(author) };
  }

  @Get('/:authorId')
  async get(
    @Param('authorId') authorId: string,
  ): Promise<{ author: AuthorViewModelResponse }> {
    const author = await this.getAuthorAccount.execute({
      authorId,
    });

    return { author: AuthorViewModel.toHTTP(author) };
  }

  @Get('/')
  async list(): Promise<{ authors: AuthorViewModelResponse[] }> {
    const authors = await this.listAuthorsAccount.execute();

    return { authors: authors.map(AuthorViewModel.toHTTP) };
  }

  @Delete('/:authorId')
  async delete(@Param('authorId') authorId: string): Promise<void> {
    await this.deleteAuthorAccount.execute({ authorId });
  }
}
