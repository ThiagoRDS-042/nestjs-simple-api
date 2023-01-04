import { Content } from '@modules/post/entities/content';
import { Post } from '@modules/post/entities/post.entity';

interface IRawPost {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class PrismaPostMapper {
  public static toPrisma(post: Post): IRawPost {
    return {
      id: post.id,
      authorId: post.authorId,
      title: post.title,
      content: post.content.value,
      category: post.category,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      deletedAt: post.deletedAt,
    };
  }

  public static toDomain(raw: IRawPost): Post {
    return Post.newPost(
      {
        authorId: raw.authorId,
        title: raw.title,
        category: raw.category,
        content: Content.newContent(raw.content),
        publishedAt: raw.publishedAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    );
  }
}
