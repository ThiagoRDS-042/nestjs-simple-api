import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorAccountBody {
  @ApiProperty({
    description: 'E-mail to update a author account',
    example: 'author-updated@mail.com.br',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Name to update a author account',
    example: 'author-name-updated',
    maxLength: 240,
    type: String,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 240)
  name: string;

  @ApiProperty({
    description: 'Password to update a author account',
    example: 'strong-password',
    maxLength: 16,
    type: String,
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;

  @ApiProperty({
    description: 'Phone to update a author account',
    example: '(11) 2.3623-1235)',
    maxLength: 16,
    type: String,
    minLength: 16,
  })
  @IsNotEmpty()
  @IsString()
  @Length(16)
  phone: string;
}
