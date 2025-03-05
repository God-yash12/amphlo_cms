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
}
