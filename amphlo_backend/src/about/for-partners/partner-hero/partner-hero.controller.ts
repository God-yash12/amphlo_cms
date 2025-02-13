import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerHeroService } from './partner-hero.service';
import { CreatePartnerHeroDto } from './dto/create-partner-hero.dto';
import { UpdatePartnerHeroDto } from './dto/update-partner-hero.dto';

@Controller('partner-hero')
export class PartnerHeroController {
  constructor(private readonly partnerHeroService: PartnerHeroService) {}

  @Patch()
  set(@Body() createPartnerHeroDto: CreatePartnerHeroDto) {
    return this.partnerHeroService.set(createPartnerHeroDto);
  }

  @Get()
  findAll() {
    return this.partnerHeroService.get();
  }
}
