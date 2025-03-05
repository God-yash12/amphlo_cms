import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateAustraliaDto } from './dto/create-country.dto';
import { UpdateAustraliaDto } from './dto/update-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) { }
  @Post()
  create(@Body() createAustraliaDto: CreateAustraliaDto) {
    return this.countryService.create(createAustraliaDto);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }
}
