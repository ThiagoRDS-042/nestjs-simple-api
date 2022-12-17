import { Author, AuthorProps } from '@modules/author/entities/author.entity';
import { Phone } from '@modules/author/entities/phone';

type Override = Partial<AuthorProps>;

export function makeAuthor(override: Override = {}): Author {
  return Author.newAuthor({
    email: 'test@example.mail.com',
    name: 'john doe',
    password: 'strong-password',
    phone: Phone.newPhone('(22) 2.2222-2222)'),
    ...override,
  });
}
