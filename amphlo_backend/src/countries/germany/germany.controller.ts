import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GermanyService } from './germany.service';
import { CreateGermanyDto } from './dto/create-germany.dto';
import { UpdateGermanyDto } from './dto/update-germany.dto';

@Controller('germany')
export class GermanyController {
  constructor(private readonly germanyService: GermanyService) {}

  @Patch()
  create(@Body() createGermanyDto: CreateGermanyDto) {
    return this.germanyService.set(createGermanyDto);
  }

  @Get()
  findAll() {
    return this.germanyService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.germanyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGermanyDto: UpdateGermanyDto) {
  //   return this.germanyService.update(+id, updateGermanyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.germanyService.remove(+id);
  // }
}
