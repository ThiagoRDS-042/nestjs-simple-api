import { Author } from '@modules/author/entities/author.entity';

export interface AuthorViewModelResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export class AuthorViewModel {
  static toHTTP(author: Author): AuthorViewModelResponse {
    return {
      id: author.id,
      name: author.name,
      email: author.email,
      phone: author.phone.value,
    };
  }
}
