import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateAustraliaDto } from './dto/create-country.dto';
import { UpdateAustraliaDto } from './dto/update-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  @Patch()
  create(@Body() createAustraliaDto: CreateAustraliaDto) {
    return this.countryService.set(createAustraliaDto);
  }

  @Get()
  findAll() {
    return this.countryService.get();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.australiaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAustraliaDto: UpdateAustraliaDto) {
  //   return this.australiaService.update(+id, updateAustraliaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.australiaService.remove(+id);
  // }
}
