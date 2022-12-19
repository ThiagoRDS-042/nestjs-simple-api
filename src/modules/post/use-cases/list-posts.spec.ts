import { makeAuthor } from '@test/factories/authors-factory';
import { makePost } from '@test/factories/posts-factory';
import { InMemoryAuthorsRepository } from '@test/repositories/in-memory-authors-repository';
import { InMemoryPostsRepository } from '@test/repositories/in-memory-posts-repository';

import { ListPosts } from './list-posts';

describe('List posts', () => {
  let inMemoryPostsRepository: InMemoryPostsRepository;
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
  let listPosts: ListPosts;

  beforeEach((done) => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
    listPosts = new ListPosts(inMemoryPostsRepository);
    done();
  });

  it('should be able to lis an posts', async () => {
    const author = makeAuthor();
    await inMemoryAuthorsRepository.create(author);

    const post_1 = makePost({ authorId: author.id });
    await inMemoryPostsRepository.create(post_1);

    const post_2 = makePost({
      authorId: author.id,
      title: 'This is a new title',
    });
    await inMemoryPostsRepository.create(post_2);

    const posts = await listPosts.execute({
      authorIdEquals: author.id,
    });

    expect(posts).toHaveLength(2);
  });
});
