import { AppError } from '@shared/errors/app-error';

import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';

import { CreateAuthorAccount } from './create-author-account';

describe('Create author account', () => {
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let createAuthorAccount: CreateAuthorAccount;

  beforeAll((done) => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    createAuthorAccount = new CreateAuthorAccount(inMemoryAuthorsRepository);
    done();
  });

  it('should be able to create a new author account', async () => {
    const author = await createAuthorAccount.execute({
      email: 'test@example.com',
      password: 'strong-password',
      name: 'john doe',
      phone: '(12) 2.3699-9563',
    });

    expect(inMemoryAuthorsRepository.authors).toHaveLength(1);
    expect(inMemoryAuthorsRepository.authors[0]).toEqual(author);
  });

  it('should be able to create a new author account with existing email', async () => {
    await createAuthorAccount.execute({
      email: 'test@example.com.br',
      password: 'strong-password',
      name: 'john doe',
      phone: '(12) 2.3699-9563',
    });

    await expect(() =>
      createAuthorAccount.execute({
        email: 'test@example.com.br',
        password: 'strong-password',
        name: 'john doe',
        phone: '(12) 2.3699-9563',
      }),
    ).rejects.toThrow(AppError);
  });
});
