import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';
import { fileFilterConfig } from 'src/config/file-filter.config';

@Controller('features-hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Patch()
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig,
    fileFilter: fileFilterConfig
  }))
  async create(@Body() createHeroDto: CreateHeroDto, @UploadedFile() file: Express.Multer.File) {
    return this.heroService.set(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroService.get();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(+id);
  }
}
