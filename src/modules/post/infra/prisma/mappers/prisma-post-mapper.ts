import { Content } from '@modules/post/entities/content';
import { Post } from '@modules/post/entities/post.entity';
import { Post as RawPost } from '@prisma/client';

export class PrismaPostMapper {
  public static toPrisma(post: Post): RawPost {
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

  public static toDomain(raw: RawPost): Post {
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
