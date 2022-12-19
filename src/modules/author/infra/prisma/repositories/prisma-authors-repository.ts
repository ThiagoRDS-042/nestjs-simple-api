import { PrismaService } from '@shared/infra/database/prisma/prisma.service';

import { Author } from '@modules/author/entities/author.entity';
import {
  AuthorsRepository,
  IFindManyAuthorsRequest,
} from '@modules/author/repositories/authors-repository';
import { Injectable } from '@nestjs/common';

import { PrismaAuthorMapper } from '../mappers/prisma-author-mapper';

@Injectable()
export class PrismaAuthorsRepository implements AuthorsRepository {
  constructor(private prisma: PrismaService) {}

  async create(author: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(author);

    await this.prisma.author.create({
      data: raw,
    });
  }

  async save(author: Author): Promise<void> {
    const raw = PrismaAuthorMapper.toPrisma(author);

    await this.prisma.author.update({
      data: raw,
      where: {
        id: raw.id,
      },
    });
  }

  async findById(authorId: string): Promise<Author | null> {
    const author = await this.prisma.author.findFirst({
      where: {
        id: authorId,
        deletedAt: null,
      },
    });

    if (!author) {
      return null;
    }

    return PrismaAuthorMapper.toDomain(author);
  }

  async findByEmail(email: string): Promise<Author | null> {
    const author = await this.prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (!author) {
      return null;
    }

    return PrismaAuthorMapper.toDomain(author);
  }

  async findMany(options: IFindManyAuthorsRequest): Promise<Author[]> {
    const { emailContains, nameContains } = options;

    const authors = await this.prisma.author.findMany({
      where: {
        email: {
          contains: emailContains,
        },
        name: {
          contains: nameContains,
        },
        deletedAt: {
          equals: null,
        },
      },
    });

    return authors.map(PrismaAuthorMapper.toDomain);
  }
}
