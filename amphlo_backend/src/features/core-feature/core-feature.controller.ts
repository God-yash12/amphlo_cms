import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoreFeatureService } from './core-feature.service';
import { CreateCoreFeatureDto } from './dto/create-core-feature.dto';
import { UpdateCoreFeatureDto } from './dto/update-core-feature.dto';

@Controller('core-features')
export class CoreFeatureController {
  constructor(private readonly coreFeatureService: CoreFeatureService) { }

  @Patch()
  create(@Body() createCoreFeatureDto: CreateCoreFeatureDto) {
    return this.coreFeatureService.set(createCoreFeatureDto);
  }

  @Get()
  findAll() {
    return this.coreFeatureService.get();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coreFeatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoreFeatureDto: UpdateCoreFeatureDto) {
    return this.coreFeatureService.update(+id, updateCoreFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coreFeatureService.remove(+id);
  }
}
