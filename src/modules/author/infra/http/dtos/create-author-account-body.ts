import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorAccountBody {
  @ApiProperty({
    description: 'E-mail to create a new author account',
    example: 'author@mail.com.br',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Name to create a new author account',
    example: 'author-name',
    type: String,
    maxLength: 240,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 240)
  name: string;

  @ApiProperty({
    description: 'Password to create a new author account',
    example: 'strong-password',
    type: String,
    maxLength: 16,
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;

  @ApiProperty({
    description: 'Phone to create a new author account',
    example: '(11) 2.3695-8975)',
    type: String,
    maxLength: 16,
    minLength: 16,
  })
  @IsNotEmpty()
  @IsString()
  @Length(16)
  phone: string;
}
