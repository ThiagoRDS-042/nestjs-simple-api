import { IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ListAuthorsAccountQuery {
  @ApiProperty({
    description: 'E-mail to search of authors',
    required: false,
    type: String,
    example: 'author@mail.com.br',
  })
  @IsOptional()
  emailContains: string;

  @ApiProperty({
    description: 'Name to search of authors',
    example: 'author-name',
    type: String,
    required: false,
  })
  @IsOptional()
  nameContains: string;
}
