import { AppError } from '@shared/errors/app-error';

import { makeAuthor } from '@test/factories/authors-factory';
import { makePost } from '@test/factories/posts-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';
import { InMemoryPostsRepository } from '@test/repositories/in-memory-posts-repository';

import { UpdatePost } from './update-post';

describe('Update post', () => {
  let inMemoryPostsRepository: InMemoryPostsRepository;
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let updatePost: UpdatePost;

  beforeEach((done) => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    updatePost = new UpdatePost(inMemoryPostsRepository);
    done();
  });

  it('should be able to update a post', async () => {
    const author = makeAuthor();
    await inMemoryAuthorsRepository.create(author);

    const post = makePost({ authorId: author.id });
    await inMemoryPostsRepository.create(post);

    const updatedPost = await updatePost.execute({
      category: 'commercial',
      content: 'This is a content updated',
      title: 'This is a new post updated',
      postId: post.id,
    });

    expect(updatedPost.content.value).toBe('This is a content updated');
    expect(updatedPost.category).toBe('commercial');
    expect(updatedPost.title).toBe('This is a new post updated');
  });

  it('should not be able to update a post with a existing title', async () => {
    const author = makeAuthor();
    await inMemoryAuthorsRepository.create(author);

    const post_1 = makePost({ authorId: author.id });
    await inMemoryPostsRepository.create(post_1);

    const post_2 = makePost({
      authorId: author.id,
      title: 'This is a new post updated',
    });
    await inMemoryPostsRepository.create(post_2);

    await expect(() =>
      updatePost.execute({
        category: 'commercial',
        content: 'This is a content updated',
        title: 'This is a new post updated',
        postId: post_1.id,
      }),
    ).rejects.toThrow(AppError);
  });

  it('should not be able to update a non existing post', async () => {
    await expect(() =>
      updatePost.execute({
        category: 'commercial',
        content: 'This is a content',
        title: 'This is a new post',
        postId: 'non exiting-post-id',
      }),
    ).rejects.toThrow(AppError);
  });
});
