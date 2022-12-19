import { AppError } from '@shared/errors/app-error';

import { makeAuthor } from '@test/factories/authors-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';
import { InMemoryPostsRepository } from '@test/repositories/in-memory-posts-repository';

import { PublishNewPost } from './publish-new-post';

describe('Publish new post', () => {
  let inMemoryPostsRepository: InMemoryPostsRepository;
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let publishNewPost: PublishNewPost;

  beforeEach((done) => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    publishNewPost = new PublishNewPost(
      inMemoryPostsRepository,
      inMemoryAuthorsRepository,
    );
    done();
  });

  it('should be able to publish a new post', async () => {
    const author = makeAuthor();
    await inMemoryAuthorsRepository.create(author);

    const post = await publishNewPost.execute({
      authorId: author.id,
      category: 'social',
      content: 'This is a content',
      title: 'This is a new post',
    });

    expect(inMemoryPostsRepository.posts).toHaveLength(1);
    expect(inMemoryPostsRepository.posts[0]).toEqual(post);
  });

  it('should not be able to publish a new post with a existing title', async () => {
    const author = makeAuthor();
    await inMemoryAuthorsRepository.create(author);

    await publishNewPost.execute({
      authorId: author.id,
      category: 'social',
      content: 'This is a content',
      title: 'This is a new post',
    });

    await expect(() =>
      publishNewPost.execute({
        authorId: author.id,
        category: 'social',
        content: 'This is a content',
        title: 'This is a new post',
      }),
    ).rejects.toThrow(AppError);
  });

  it('should not be able to publish a new post with a non existing author', async () => {
    await expect(() =>
      publishNewPost.execute({
        authorId: 'non-existing-author-id',
        category: 'social',
        content: 'This is a content',
        title: 'This is a new post',
      }),
    ).rejects.toThrow(AppError);
  });
});
