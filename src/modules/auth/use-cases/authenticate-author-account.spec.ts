import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/app-error';

import { jwtConfig } from '@configs/jwt-config';
import { makeAuthor } from '@test/factories/authors-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';

import { AuthenticateAuthorAccount } from './authenticate-author-account';

describe('Authenticate author account', () => {
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;

  let authenticateAuthorAccount: AuthenticateAuthorAccount;

  beforeEach(async () => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();

    authenticateAuthorAccount = new AuthenticateAuthorAccount(
      inMemoryAuthorsRepository,
    );

    jwtConfig.secretKey = 'secretKeyTest';
  });

  it('should be able to authenticate a author account', async () => {
    const password = 'strong-password';

    const author = makeAuthor({ password: await hash(password, 10) });

    await inMemoryAuthorsRepository.create(author);

    const { accessToken, author: author_response } =
      await authenticateAuthorAccount.execute({
        email: author.email,
        password,
      });

    expect(accessToken).toBeTruthy();
    expect(author_response).toEqual(author);
  });

  it('should not be able to authenticate a author account with a invalid email', async () => {
    await expect(() =>
      authenticateAuthorAccount.execute({
        email: 'invalid-email',
        password: 'strong-password',
      }),
    ).rejects.toThrow(AppError);
  });

  it('should not be able to authenticate a author account with a invalid password', async () => {
    const author = makeAuthor({ password: await hash('strong-password', 10) });

    await inMemoryAuthorsRepository.create(author);

    await expect(() =>
      authenticateAuthorAccount.execute({
        email: author.email,
        password: 'invalid-password',
      }),
    ).rejects.toThrow(AppError);
  });
});
