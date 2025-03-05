import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniFeatureService } from './uni-feature.service';
import { CreateUniFeatureDto } from './dto/create-uni-feature.dto';
import { UpdateUniFeatureDto } from './dto/update-uni-feature.dto';

@Controller('university-feature')
export class UniFeatureController {
  constructor(private readonly uniFeatureService: UniFeatureService) {}

  @Patch()
  set(@Body() createUniFeatureDto: CreateUniFeatureDto) {
    return this.uniFeatureService.set(createUniFeatureDto);
  }


  @Get()
  get() {
    return this.uniFeatureService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.uniFeatureService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUniFeatureDto: UpdateUniFeatureDto) {
  //   return this.uniFeatureService.update(+id, updateUniFeatureDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.uniFeatureService.remove(+id);
  // }
}
