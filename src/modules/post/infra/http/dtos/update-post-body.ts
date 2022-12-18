import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePostBody {
  @IsNotEmpty()
  @IsString()
  @Length(3, 12)
  category: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  @IsString()
  @Length(12, 120)
  title: string;
}
