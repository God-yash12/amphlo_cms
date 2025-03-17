import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoreFeatureService } from './core-feature.service';
import { CreateCoreFeatureDto } from './dto/create-core-feature.dto';

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

}
