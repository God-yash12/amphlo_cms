import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('university-hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Patch()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.set(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroService.get();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.heroService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
  //   return this.heroService.update(+id, updateHeroDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.heroService.remove(+id);
  // }
}
