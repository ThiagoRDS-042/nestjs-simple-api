import { AppError } from '@shared/errors/app-error';

import { makeAuthor } from '@test/factories/authors-factory';
import { makePost } from '@test/factories/posts-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';
import { InMemoryPostsRepository } from '@test/repositories/in-memory-posts-repository';

import { DeletePost } from './delete-post';

describe('Delete post', () => {
  let inMemoryPostsRepository: InMemoryPostsRepository;
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let deletePost: DeletePost;

  beforeEach((done) => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    deletePost = new DeletePost(inMemoryPostsRepository);
    done();
  });

  it('should be able to delete a post', async () => {
    const author = makeAuthor();
    await inMemoryAuthorsRepository.create(author);

    const post = makePost({ authorId: author.id });
    await inMemoryPostsRepository.create(post);

    await deletePost.execute({
      postId: post.id,
    });

    expect(inMemoryPostsRepository.posts[0].deletedAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to delete a non existing post', async () => {
    await expect(() =>
      deletePost.execute({
        postId: 'non-existing-post-id',
      }),
    ).rejects.toThrow(AppError);
  });
});
