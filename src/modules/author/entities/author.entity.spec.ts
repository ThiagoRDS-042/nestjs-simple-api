import { Author } from './author.entity';
import { Phone } from './phone';

describe('Author', () => {
  it('should be able to create a new author', () => {
    const author = Author.newAuthor({
      email: 'author@example.com',
      name: 'john doe',
      password: 'strong-password',
      phone: Phone.newPhone('(56) 9.2356-4556'),
    });

    expect(author).toBeTruthy();
  });
});
