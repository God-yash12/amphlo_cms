import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortalFeatureService } from './portal-feature.service';
import { CreatePortalFeatureDto } from './dto/create-portal-feature.dto';
import { UpdatePortalFeatureDto } from './dto/update-portal-feature.dto';

@Controller('portal-feature')
export class PortalFeatureController {
  constructor(private readonly portalFeatureService: PortalFeatureService) {}

  @Patch()
  create(@Body() createPortalFeatureDto: CreatePortalFeatureDto) {
    return this.portalFeatureService.set(createPortalFeatureDto);
  }

  @Get()
  findAll() {
    return this.portalFeatureService.get();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.portalFeatureService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePortalFeatureDto: UpdatePortalFeatureDto) {
  //   return this.portalFeatureService.update(+id, updatePortalFeatureDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.portalFeatureService.remove(+id);
  // }
}
