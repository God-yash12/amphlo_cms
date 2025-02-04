import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';
import { fileFilterConfig } from 'src/config/file-filter.config';

@ApiTags('hero')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Patch()
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig,
    fileFilter: fileFilterConfig,
  }))
  @ApiOperation({ summary: 'Create a new hero' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Hero data',
    type: CreateHeroDto,
  })
  @ApiResponse({ status: 201, description: 'The hero has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() dto: CreateHeroDto,
   @UploadedFile() file: Express.Multer.File,
) {
    return this.heroService.set(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all heroes' })
  @ApiResponse({ status: 200, description: 'Return all heroes.' })
  findAll() {
    return this.heroService.get();
  }

}
