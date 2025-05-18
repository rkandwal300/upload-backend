import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
  @Get()
  findAll(@Query() query: ListAllEntities) {
    return this.catsService.findAll(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(Number(id));
  }
  @Patch(':id')
  update(@Param('id') id: string, updateCatDto: UpdateCatDto) {
    return this.catsService.update(Number(id), updateCatDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.catsService.delete(Number(id));
  }
}
