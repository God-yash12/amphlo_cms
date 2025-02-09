import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FeatureCardsService } from './feature-cards.service';
import { CreateFeatureCardDto } from './dto/create-feature-card.dto';
import { UpdateFeatureCardDto } from './dto/update-feature-card.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilterConfig } from 'src/config/file-filter.config';
import { storageConfig } from 'src/config/storage.config';

@Controller('core-feature-card')
export class FeatureCardsController {
  constructor(private readonly featureCardsService: FeatureCardsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig,
    fileFilter: fileFilterConfig,
  }))
  async create(@Body() dto: CreateFeatureCardDto, @UploadedFile() file: Express.Multer.File) {
    return await this.featureCardsService.create(dto);
  }

  @Get()
  findAll() {
    return this.featureCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureCardsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureCardsService.remove(+id);
  }
}
