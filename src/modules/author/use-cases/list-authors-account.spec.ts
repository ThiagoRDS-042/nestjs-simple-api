import { makeAuthor } from '@test/factories/authors-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';

import { LisAuthorsAccount } from './list-authors-account';

describe('List author account', () => {
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let listAuthorAccount: LisAuthorsAccount;

  beforeAll((done) => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    listAuthorAccount = new LisAuthorsAccount(inMemoryAuthorsRepository);
    done();
  });

  it('should be able to list a authors account', async () => {
    await inMemoryAuthorsRepository.create(
      makeAuthor({
        name: 'author-1',
        email: 'author-2@example.com',
      }),
    );

    await inMemoryAuthorsRepository.create(
      makeAuthor({
        name: 'author-2',
        email: 'author-2@example.com',
      }),
    );

    const authors = await listAuthorAccount.execute();

    expect(authors).toHaveLength(2);
  });
});