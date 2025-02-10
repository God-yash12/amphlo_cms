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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.portalHeroService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePortalHeroDto: UpdatePortalHeroDto) {
  //   return this.portalHeroService.update(+id, updatePortalHeroDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.portalHeroService.remove(+id);
  // }
}
