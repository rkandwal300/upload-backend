import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListAllEntities {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  limit: number;
}
