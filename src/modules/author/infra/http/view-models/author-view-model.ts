import { Author } from '@modules/author/entities/author.entity';

import { Author as AuthorResponse } from '../dtos/author-response';

export class AuthorViewModel {
  static toHTTP(author: Author): AuthorResponse {
    return {
      id: author.id,
      name: author.name,
      email: author.email,
      phone: author.phone.value,
    };
  }
}
