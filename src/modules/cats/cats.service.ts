import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatDto } from './dto/cat.dto';

@Injectable()
export class CatsService {
  private cats: CatDto[] = [];

  create(createCatDto: CreateCatDto) {
    const newCat: CatDto = {
      id: this.cats.length,
      ...createCatDto,
    };
    this.cats.push(newCat);
    return { message: `${createCatDto.name} successfully added`, cat: newCat };
  }

  findAll(query?: ListAllEntities) {
    const limit = query?.limit;
    const result = limit ? this.cats.slice(0, limit) : this.cats;
    return { count: result.length, cats: result };
  }

  findOne(id: number) {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) throw new NotFoundException(`Cat with id ${id} not found`);
    return cat;
  }
  update(id: number, updateCatDto: UpdateCatDto) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1)
      throw new NotFoundException(`Cat with id ${id} not found`);

    this.cats[index] = { ...this.cats[index], ...updateCatDto };
    return { message: `Cat with id ${id} updated`, cat: this.cats[index] };
  }

  delete(id: number) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1)
      throw new NotFoundException(`Cat with id ${id} not found`);

    const removedCat = this.cats.splice(index, 1)[0];
    return { message: `Cat with id ${id} deleted`, cat: removedCat };
  }
}
