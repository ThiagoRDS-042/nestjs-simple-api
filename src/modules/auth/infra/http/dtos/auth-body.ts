import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}
