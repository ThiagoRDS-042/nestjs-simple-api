import { Content } from './content';
import { Post } from './post.entity';

describe('Post', () => {
  it('should be able to create and publish a new post', () => {
    const post = Post.newPost({
      authorId: 'example-author-id',
      content: Content.newContent('Is a new post created'),
      title: 'This is a new post',
      category: 'social',
    });

    post.publish();

    expect(post).toBeTruthy();
    expect(post.publishedAt).toEqual(expect.any(Date));
  });
});
