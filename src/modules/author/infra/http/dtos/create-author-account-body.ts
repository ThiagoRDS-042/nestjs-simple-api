import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthorAccountBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 240)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(16)
  phone: string;
}
