import { IsOptional } from 'class-validator';

export class ListPostsQuery {
  @IsOptional()
  categoryEq?: string;

  @IsOptional()
  titleContains?: string;

  @IsOptional()
  authorIdEq?: string;
}
