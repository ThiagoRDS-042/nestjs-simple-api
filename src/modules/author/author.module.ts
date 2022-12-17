import { DatabaseModule } from '@shared/infra/database/database.module';

import { Module } from '@nestjs/common';

import { AuthorController } from './infra/http/controllers/author-controller';
import { CreateAuthorAccount } from './use-cases/create-author-account';
import { DeleteAuthorAccount } from './use-cases/delete-author-account';
import { GetAuthorAccount } from './use-cases/get-author-account';
import { ListAuthorsAccount } from './use-cases/list-authors-account';
import { UpdateAuthorAccount } from './use-cases/update-author-account';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController],
  providers: [
    CreateAuthorAccount,
    UpdateAuthorAccount,
    GetAuthorAccount,
    ListAuthorsAccount,
    DeleteAuthorAccount,
  ],
})
export class AuthorModule {}
