import { Author } from '@modules/author/entities/author.entity';
import { Phone } from '@modules/author/entities/phone';
import { Author as RawAuthor } from '@prisma/client';

export class PrismaAuthorMapper {
  public static toPrisma(author: Author): RawAuthor {
    return {
      id: author.id,
      email: author.email,
      name: author.name,
      password: author.password,
      phone: author.phone.value,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
      deletedAt: author.deletedAt,
    };
  }

  public static toDomain(raw: RawAuthor): Author {
    return Author.newAuthor(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        phone: Phone.newPhone(raw.phone),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    );
  }
}
