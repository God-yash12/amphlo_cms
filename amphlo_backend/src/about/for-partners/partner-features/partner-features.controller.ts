import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerFeaturesService } from './partner-features.service';
import { CreatePartnerFeatureDto } from './dto/create-partner-feature.dto';
import { UpdatePartnerFeatureDto } from './dto/update-partner-feature.dto';

@Controller('partner-features')
export class PartnerFeaturesController {
  constructor(private readonly partnerFeaturesService: PartnerFeaturesService) {}

  @Patch()
  async set(@Body() createPartnerFeatureDto: CreatePartnerFeatureDto) {
    return this.partnerFeaturesService.set(createPartnerFeatureDto);
  }

  @Get()
  findAll() {
    return this.partnerFeaturesService.get();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerFeatureDto: UpdatePartnerFeatureDto) {
    return this.partnerFeaturesService.update(+id, updatePartnerFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerFeaturesService.remove(+id);
  }
}
