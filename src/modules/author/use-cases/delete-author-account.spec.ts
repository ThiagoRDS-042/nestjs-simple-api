import { makeAuthor } from '@test/factories/authors-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';

import { DeleteAuthorAccount } from './delete-author-account';
import { AuthorNotFound } from './errors/author-not-found';

describe('Delete author account', () => {
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let deleteAuthorAccount: DeleteAuthorAccount;

  beforeAll((done) => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    deleteAuthorAccount = new DeleteAuthorAccount(inMemoryAuthorsRepository);
    done();
  });

  it('should be able to delete a author account', async () => {
    const author = makeAuthor();

    await inMemoryAuthorsRepository.create(author);

    await deleteAuthorAccount.execute({
      authorId: author.id,
    });

    expect(inMemoryAuthorsRepository.authors[0].deletedAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to delete a non existing author id', async () => {
    await expect(() =>
      deleteAuthorAccount.execute({
        authorId: 'non-existing-author-id',
      }),
    ).rejects.toThrow(AuthorNotFound);
  });
});
