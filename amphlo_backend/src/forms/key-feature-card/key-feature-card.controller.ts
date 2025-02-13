import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { KeyFeatureCardService } from './key-feature-card.service';
import { CreateKeyFeatureCardDto } from './dto/create-key-feature-card.dto';
import { UpdateKeyFeatureCardDto } from './dto/update-key-feature-card.dto';

@Controller('key-feature-card')
export class KeyFeatureCardController {
  constructor(private readonly keyFeatureCardService: KeyFeatureCardService) { }

  @Post()
  async create(@Body() dto: CreateKeyFeatureCardDto, @UploadedFile() file: Express.Multer.File) {
    return await this.keyFeatureCardService.create(dto);
  }

  @Get()
  findAll() {
    return this.keyFeatureCardService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.keyFeatureCardService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeyFeatureCardDto: UpdateKeyFeatureCardDto) {
    return this.keyFeatureCardService.update(+id, updateKeyFeatureCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyFeatureCardService.remove(+id);
  }
}
