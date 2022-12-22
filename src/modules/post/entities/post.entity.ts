import { BaseEntity } from '@shared/utils/base-entity';
import { Replace } from '@shared/utils/replace';

import { Content } from './content';

export interface PostProps {
  title: string;
  content: Content;
  category: string;
  publishedAt?: Date;
  authorId: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class Post extends BaseEntity<PostProps> {
  constructor(
    props: Replace<
      PostProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        publishedAt?: Date;
      }
    >,
    id?: string,
  ) {
    super(props, id);
  }

  public get id(): string {
    return this._id;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public publish() {
    this.props.publishedAt = new Date();
  }

  public get publishedAt(): Date {
    return this.props.publishedAt;
  }

  public set authorId(authorId: string) {
    this.props.authorId = authorId;
  }

  public get authorId(): string {
    return this.props.authorId;
  }

  public get createdAt(): Date | null | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public delete() {
    this.props.deletedAt = new Date();
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }

  public static newPost(props: PostProps, id?: string): Post {
    const post = new Post(props, id);

    return post;
  }
}
