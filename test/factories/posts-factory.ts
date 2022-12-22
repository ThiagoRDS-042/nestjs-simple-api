import { randomUUID } from 'crypto';

import { Content } from '@modules/post/entities/content';
import { Post, PostProps } from '@modules/post/entities/post.entity';

type Override = Partial<PostProps>;

export function makePost(override: Override = {}): Post {
  return Post.newPost({
    authorId: randomUUID(),
    category: 'social',
    content: Content.newContent('This is a post content'),
    title: 'This is a new post',
    ...override,
  });
}
