import { Post } from '@modules/post/entities/post.entity';

interface PostViewModelResponse {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  publishedAt: Date;
}

export class PostViewModel {
  static toHTTP(post: Post): PostViewModelResponse {
    return {
      id: post.id,
      title: post.title,
      content: post.content.value,
      category: post.category,
      authorId: post.authorId,
      publishedAt: post.publishedAt,
    };
  }
}
