import { AppError } from '@shared/errors/app-error';

import { makeAuthor } from '@test/factories/authors-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';

import { UpdateAuthorAccount } from './update-author-account';

describe('Update author account', () => {
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let updateAuthorAccount: UpdateAuthorAccount;

  beforeEach((done) => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    updateAuthorAccount = new UpdateAuthorAccount(inMemoryAuthorsRepository);
    done();
  });

  it('should be able to update a author account', async () => {
    const inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    const updateAuthorAccount = new UpdateAuthorAccount(
      inMemoryAuthorsRepository,
    );

    const author = makeAuthor();

    await inMemoryAuthorsRepository.create(author);

    const updatedAuthor = await updateAuthorAccount.execute({
      authorId: author.id,
      email: 'john@example.com.br',
      name: 'John',
      password: 'password',
      phone: '(11) 1.1111-1111',
    });

    expect(inMemoryAuthorsRepository.authors).toHaveLength(1);
    expect(inMemoryAuthorsRepository.authors[0]).toEqual(updatedAuthor);
  });

  it('should not be able to update a author account with a existing email', async () => {
    await inMemoryAuthorsRepository.create(
      makeAuthor({ email: 'john@example.com.br' }),
    );

    const author = makeAuthor();

    await inMemoryAuthorsRepository.create(author);

    await expect(() =>
      updateAuthorAccount.execute({
        authorId: author.id,
        email: 'john@example.com.br',
        name: 'John',
        password: 'password',
        phone: '(11) 1.1111-1111',
      }),
    ).rejects.toThrow(AppError);
  });

  it('should not be able to update a non exiting author', async () => {
    await expect(() =>
      updateAuthorAccount.execute({
        authorId: 'non-existing-author-id',
        email: 'john@example.com.br',
        name: 'John',
        password: 'password',
        phone: '(11) 1.1111-1111',
      }),
    ).rejects.toThrow(AppError);
  });
});
