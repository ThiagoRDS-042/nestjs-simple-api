import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/app-error';
import { DatabaseModule } from '@shared/infra/database/database.module';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { makeAuthor } from '@test/factories/authors-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';

import { AuthenticateAuthorAccount } from './authenticate-author-account';

describe('Authenticate author account', () => {
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let jwtService: JwtService;
  let authenticateAuthorAccount: AuthenticateAuthorAccount;

  beforeEach(async () => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();

    const moduleRef = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: { expiresIn: '1h', algorithm: 'HS256' },
        }),
      ],
      exports: [JwtModule],
    }).compile();

    jwtService = moduleRef.get<JwtService>(JwtService);

    authenticateAuthorAccount = new AuthenticateAuthorAccount(
      inMemoryAuthorsRepository,
      jwtService,
    );
  });

  it('should be able to authenticate a author account', async () => {
    const password = 'strong-password';

    const author = makeAuthor({ password: await hash(password, 10) });

    await inMemoryAuthorsRepository.create(author);

    const { access_token, author: author_response } =
      await authenticateAuthorAccount.execute({
        email: author.email,
        password,
      });

    expect(access_token).toBeTruthy();
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
