import { randomUUID } from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

export class Author {
  @ApiProperty({
    description: 'Id of the author',
    type: String,
    example: randomUUID(),
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the author',
    type: String,
    example: 'author-name',
  })
  name: string;

  @ApiProperty({
    description: 'E-mail of the author',
    type: String,
    example: 'author@mail.com.br',
  })
  email: string;

  @ApiProperty({
    description: 'Phone of the author',
    type: String,
    example: '(11) 2.3698-7894',
  })
  phone: string;
}

export class AuthorResponse {
  @ApiProperty({
    type: Author,
  })
  author: Author;
}

export class AuthorsResponse {
  @ApiProperty({
    type: [Author],
  })
  authors: Author[];
}
