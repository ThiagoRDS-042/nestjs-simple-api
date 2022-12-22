import { IsNotEmpty, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostBody {
  @ApiProperty({
    description: 'Category to update a post',
    example: 'commercial',
    type: String,
    maxLength: 12,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 12)
  category: string;

  @ApiProperty({
    description: 'Content to update a post',
    example: 'This is a updated content example to publish of post',
    type: String,
    maxLength: 240,
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 240)
  content: string;

  @ApiProperty({
    description: 'Title to update a post',
    example: 'This is updated title example to publish of post',
    type: String,
    maxLength: 120,
    minLength: 12,
  })
  @IsNotEmpty()
  @IsString()
  @Length(12, 120)
  @IsNotEmpty()
  @IsString()
  @Length(12, 120)
  title: string;
}
