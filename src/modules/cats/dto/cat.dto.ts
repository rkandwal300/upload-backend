// create-cat.dto.ts
import { IntersectionType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateCatDto } from './create-cat.dto';

export class IdDto {
  @IsInt() id: number;
}

export class CatDto extends IntersectionType(IdDto, CreateCatDto) {}
