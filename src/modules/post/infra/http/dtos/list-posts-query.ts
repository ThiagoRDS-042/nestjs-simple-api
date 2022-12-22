import { IsOptional } from 'class-validator';
import { randomUUID } from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

export class ListPostsQuery {
  @ApiProperty({
    type: String,
    description: 'Category of the search posts',
    example: 'social',
    required: false,
  })
  @IsOptional()
  categoryEquals: string;

  @ApiProperty({
    type: String,
    example: 'This is title example to publish of post',
    required: false,
  })
  @IsOptional()
  titleContains: string;

  @ApiProperty({
    type: String,
    description: 'Author id of the search posts',
    example: randomUUID(),
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  authorIdEquals: string;
}
