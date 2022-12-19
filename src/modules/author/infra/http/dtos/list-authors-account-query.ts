import { IsOptional } from 'class-validator';

export class ListAuthorsAccountQuery {
  @IsOptional()
  emailContains: string;

  @IsOptional()
  nameContains: string;
}
