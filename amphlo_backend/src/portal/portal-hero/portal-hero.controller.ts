import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortalHeroService } from './portal-hero.service';
import { CreatePortalHeroDto } from './dto/create-portal-hero.dto';
import { UpdatePortalHeroDto } from './dto/update-portal-hero.dto';

@Controller('portal-hero')
export class PortalHeroController {
  constructor(private readonly portalHeroService: PortalHeroService) {}

  @Patch()
  create(@Body() createPortalHeroDto: CreatePortalHeroDto) {
    return this.portalHeroService.set(createPortalHeroDto);
  }

  @Get()
  findAll() {
    return this.portalHeroService.get();
  }
}
