import { Author } from '@modules/author/entities/author.entity';

export interface IFindManyAuthorsRequest {
  emailContains?: string;
  nameContains?: string;
}

export abstract class AuthorsRepository {
  abstract create(author: Author): Promise<void>;
  abstract save(author: Author): Promise<void>;
  abstract findById(authorId: string): Promise<Author | null>;
  abstract findByEmail(email: string): Promise<Author | null>;
  abstract findMany(options: IFindManyAuthorsRequest): Promise<Author[]>;
}
