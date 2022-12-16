import { Author } from './author.entity';
import { Phone } from './phone';

describe('Author', () => {
  it('should be able to create a new author', () => {
    const author = new Author({
      email: 'author@example.com',
      name: 'jhon doe',
      password: 'strong-password',
      phone: new Phone('(56) 9.2356-4556'),
    });

    expect(author).toBeTruthy();
  });
});
