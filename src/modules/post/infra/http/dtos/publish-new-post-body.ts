import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { randomUUID } from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

export class PublishNewPostBody {
  @ApiProperty({
    description: 'Author id to publish a new post',
    format: 'uuid',
    example: randomUUID(),
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @ApiProperty({
    description: 'Category to publish a new post',
    example: 'social',
    type: String,
    maxLength: 12,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 12)
  category: string;

  @ApiProperty({
    description: 'Content to publish a new post',
    example: 'This is content example to publish of post',
    type: String,
    maxLength: 240,
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 240)
  content: string;

  @ApiProperty({
    description: 'Title to publish a new post',
    example: 'This is title example to publish of post',
    type: String,
    maxLength: 120,
    minLength: 12,
  })
  @IsNotEmpty()
  @IsString()
  @Length(12, 120)
  title: string;
}
