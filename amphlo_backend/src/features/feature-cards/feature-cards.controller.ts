import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FeatureCardsService } from './feature-cards.service';
import { CreateFeatureCardDto } from './dto/create-feature-card.dto';
import { UpdateFeatureCardDto } from './dto/update-feature-card.dto';

@Controller('core-feature-card')
export class FeatureCardsController {
  constructor(private readonly featureCardsService: FeatureCardsService) {}

  @Post()
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

  @Patch(':id') 
  update(@Param('id') id: string, @Body() dto: UpdateFeatureCardDto){
    return this.featureCardsService.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureCardsService.remove(+id);
  }
}
