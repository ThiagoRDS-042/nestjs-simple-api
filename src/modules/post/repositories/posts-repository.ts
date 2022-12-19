import { Post } from '../entities/post.entity';

export interface IFindManyRequest {
  authorIdEq?: string;
  titleContains?: string;
  categoryEq?: string;
}

export abstract class PostsRepository {
  abstract create(post: Post): Promise<void>;
  abstract save(post: Post): Promise<void>;
  abstract findByTitle(title: string): Promise<Post | null>;
  abstract findById(postId: string): Promise<Post | null>;
  abstract findMany(options: IFindManyRequest): Promise<Post[]>;
}
