import { AppError } from '@shared/errors/app-error';

import { makeAuthor } from '@test/factories/authors-factory';
import { makePost } from '@test/factories/posts-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';
import { InMemoryPostsRepository } from '@test/repositories/in-memory-posts-repository';

import { DeleteAuthorAccount } from './delete-author-account';

describe('Delete author account', () => {
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let inMemoryPostsRepository: InMemoryPostsRepository;
  let deleteAuthorAccount: DeleteAuthorAccount;

  beforeEach((done) => {
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    inMemoryPostsRepository = new InMemoryPostsRepository();
    deleteAuthorAccount = new DeleteAuthorAccount(
      inMemoryAuthorsRepository,
      inMemoryPostsRepository,
    );
    done();
  });

  it('should be able to delete a author account', async () => {
    const author = makeAuthor();
    await inMemoryAuthorsRepository.create(author);

    const post = makePost({ authorId: author.id });
    await inMemoryPostsRepository.create(post);

    await deleteAuthorAccount.execute({
      authorId: author.id,
    });

    expect(inMemoryAuthorsRepository.authors[0].deletedAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to delete a non existing author', async () => {
    await expect(() =>
      deleteAuthorAccount.execute({
        authorId: 'non-existing-author-id',
      }),
    ).rejects.toThrow(AppError);
  });
});
