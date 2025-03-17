import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { CreateOverviewDto } from './dto/create-overview.dto';
import { UpdateOverviewDto } from './dto/update-overview.dto';

@Controller('overview')
export class OverviewController {
  constructor(private readonly overviewService: OverviewService) { }

  @Patch()
  set (@Body() createOverviewDto: CreateOverviewDto) {
    return this.overviewService.set(createOverviewDto);
  }

  @Get()
  findAll() {
    return this.overviewService.get();
  }

}
