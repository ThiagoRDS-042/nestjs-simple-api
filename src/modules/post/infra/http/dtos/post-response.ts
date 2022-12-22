import { randomUUID } from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

class Post {
  @ApiProperty({
    description: 'Id of the post',
    format: 'uuid',
    example: randomUUID(),
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Author id of the post',
    format: 'uuid',
    example: randomUUID(),
    type: String,
  })
  authorId: string;

  @ApiProperty({
    description: 'Category of the post',
    example: 'social',
    type: String,
  })
  category: string;

  @ApiProperty({
    description: 'Content of the post',
    example: 'This is content example to publish of post',
    type: String,
  })
  content: string;

  @ApiProperty({
    description: 'Title of the post',
    example: 'This is title example to publish of post',
    type: String,
  })
  title: string;
}

export class PostResponse {
  @ApiProperty({
    type: Post,
  })
  post: Post;
}

export class PostsResponse {
  @ApiProperty({
    type: [Post],
  })
  posts: Post[];
}
