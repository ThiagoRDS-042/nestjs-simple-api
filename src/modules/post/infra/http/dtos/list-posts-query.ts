import { IsOptional } from 'class-validator';

export class ListPostsQuery {
  @IsOptional()
  categoryEquals: string;

  @IsOptional()
  titleContains: string;

  @IsOptional()
  authorIdEquals: string;
}
