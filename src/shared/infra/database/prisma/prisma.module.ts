import { PrismaAuthorsRepository } from '@modules/author/infra/prisma/repositories/prisma-authors-repository';
import { AuthorsRepository } from '@modules/author/repositories/authors-repository';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    { provide: AuthorsRepository, useClass: PrismaAuthorsRepository },
  ],
  exports: [AuthorsRepository],
})
export class PrismaModule {}
