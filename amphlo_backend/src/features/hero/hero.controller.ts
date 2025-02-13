import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';

@Controller('features-hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Patch()
  async create(@Body() createHeroDto: CreateHeroDto, @UploadedFile() file: Express.Multer.File) {
    return this.heroService.set(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroService.get();
  }

}
