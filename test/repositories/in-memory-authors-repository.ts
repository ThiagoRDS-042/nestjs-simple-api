import { Author } from '@modules/author/entities/author.entity';
import {
  AuthorsRepository,
  IFindManyAuthorsRequest,
} from '@modules/author/repositories/authors-repository';

export class InMemoryAuthorsRepository implements AuthorsRepository {
  public authors: Author[] = [];

  async create(author: Author): Promise<void> {
    this.authors.push(author);
  }

  async save(author: Author): Promise<void> {
    const authorIndex = this.authors.findIndex((item) => item.id === author.id);

    if (authorIndex >= 0) {
      this.authors[authorIndex] = author;
    }
  }

  async findById(authorId: string): Promise<Author | null> {
    const author = this.authors.find((item) => item.id === authorId);

    return author;
  }

  async findByEmail(email: string): Promise<Author | null> {
    const author = this.authors.find((item) => item.email === email);

    return author;
  }

  async findMany(options: IFindManyAuthorsRequest): Promise<Author[]> {
    const { emailContains, nameContains } = options;

    let authors = this.authors;

    if (emailContains) {
      authors = authors.filter((item) =>
        item.email.toUpperCase().includes(emailContains.toUpperCase()),
      );
    }

    if (nameContains) {
      authors = authors.filter((item) =>
        item.name.toUpperCase().includes(nameContains.toUpperCase()),
      );
    }

    return authors;
  }
}
