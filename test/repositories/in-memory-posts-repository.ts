import { Post } from '@modules/post/entities/post.entity';
import {
  IFindManyPostsRequest,
  PostsRepository,
} from '@modules/post/repositories/posts-repository';

export class InMemoryPostsRepository implements PostsRepository {
  public posts: Post[] = [];

  async create(post: Post): Promise<void> {
    this.posts.push(post);
  }

  async save(post: Post): Promise<void> {
    const postIndex = this.posts.findIndex((item) => item.id === post.id);

    this.posts[postIndex] = post;
  }

  async findByTitle(title: string): Promise<Post | null> {
    const post = this.posts.find((item) => item.title === title);

    if (!post) {
      return null;
    }

    return post;
  }

  async findById(postId: string): Promise<Post | null> {
    const post = this.posts.find((item) => item.id === postId);

    if (!post) {
      return null;
    }

    return post;
  }

  async findMany(options: IFindManyPostsRequest): Promise<Post[]> {
    const { authorIdEquals, categoryEquals, titleContains } = options;

    let posts = this.posts;

    if (authorIdEquals) {
      posts = posts.filter((item) => item.authorId === authorIdEquals);
    }

    if (categoryEquals) {
      posts = posts.filter((item) => item.category === categoryEquals);
    }

    if (titleContains) {
      posts = posts.filter((item) =>
        item.title.toUpperCase().includes(titleContains.toUpperCase()),
      );
    }

    return posts;
  }
}
