import { Author } from '@modules/author/entities/author.entity';
import { AuthorsRepository } from '@modules/author/infra/repositories/authors-repository';

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

  async findMany(): Promise<Author[]> {
    return this.authors;
  }
}
