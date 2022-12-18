import { AppError } from '@shared/errors/app-error';

import { makeAuthor } from '@test/factories/authors-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';

import { GetAuthorAccount } from './get-author-account';

describe('Get author account', () => {
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let getAuthorAccount: GetAuthorAccount;

  beforeAll((done) => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    getAuthorAccount = new GetAuthorAccount(inMemoryAuthorsRepository);
    done();
  });

  it('should be able to get a author account', async () => {
    const author = makeAuthor();

    await inMemoryAuthorsRepository.create(author);

    const foundAuthor = await getAuthorAccount.execute({
      authorId: author.id,
    });

    expect(foundAuthor).toEqual(author);
  });

  it('should not be able to get a non existing author id', async () => {
    await expect(() =>
      getAuthorAccount.execute({
        authorId: 'non-existing-author-id',
      }),
    ).rejects.toThrow(AppError);
  });
});
