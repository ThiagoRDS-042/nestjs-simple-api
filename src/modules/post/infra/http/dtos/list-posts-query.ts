import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ListPostsQuery {
  @ApiProperty({
    type: String,
    description: 'Category of the search posts',
    required: false,
  })
  @IsOptional()
  categoryEquals: string;

  @ApiProperty({
    type: String,
    description: 'Title of the search posts',
    required: false,
  })
  @IsOptional()
  titleContains: string;

  @ApiProperty({
    type: String,
    description: 'Author id of the search posts',
    required: false,
  })
  @IsOptional()
  authorIdEquals: string;
}
