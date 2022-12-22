import { AppError } from '@shared/errors/app-error';

import { makeAuthor } from '@test/factories/authors-factory';
import { makePost } from '@test/factories/posts-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';
import { InMemoryPostsRepository } from '@test/repositories/in-memory-posts-repository';

import { GetPost } from './get-post';

describe('Get post', () => {
  let inMemoryPostsRepository: InMemoryPostsRepository;
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let getPost: GetPost;

  beforeEach((done) => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    getPost = new GetPost(inMemoryPostsRepository);
    done();
  });

  it('should be able to get a post', async () => {
    const author = makeAuthor();
    await inMemoryAuthorsRepository.create(author);

    const post = makePost({ authorId: author.id });
    await inMemoryPostsRepository.create(post);

    const foundedPost = await getPost.execute({
      postId: post.id,
    });

    expect(foundedPost).toEqual(post);
  });

  it('should not be able to get a non existing post', async () => {
    await expect(() =>
      getPost.execute({
        postId: 'non-existing-post-id',
      }),
    ).rejects.toThrow(AppError);
  });
});
