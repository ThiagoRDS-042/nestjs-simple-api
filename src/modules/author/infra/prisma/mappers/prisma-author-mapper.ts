import { Author } from '@modules/author/entities/author.entity';
import { Phone } from '@modules/author/entities/phone';

interface IRawAuthor {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class PrismaAuthorMapper {
  public static toPrisma(author: Author): IRawAuthor {
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

  public static toDomain(raw: IRawAuthor): Author {
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
