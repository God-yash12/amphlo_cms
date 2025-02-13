import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeatureCardService } from './feature-card.service';
import { CreateFeatureCardDto } from './dto/create-feature-card.dto';
import { UpdateFeatureCardDto } from './dto/update-feature-card.dto';

@Controller('uni-feature-card')
export class FeatureCardController {
  constructor(private readonly featureCardService: FeatureCardService) {}

  @Post()
  create(@Body() createFeatureCardDto: CreateFeatureCardDto) {
    return this.featureCardService.create(createFeatureCardDto);
  }

  @Get()
  findAll() {
    return this.featureCardService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureCardDto: UpdateFeatureCardDto) {
    return this.featureCardService.update(+id, updateFeatureCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureCardService.remove(+id);
  }
}
