import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AuthBody {
  @ApiProperty({
    example: 'author@mail.com.br',
    description: 'E-mail of the author',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strong-password',
    maxLength: 16,
    minLength: 6,
    description: 'Password of the author',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}
