import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AustraliaService } from './australia.service';
import { CreateAustraliaDto } from './dto/create-australia.dto';
import { UpdateAustraliaDto } from './dto/update-australia.dto';

@Controller('australia')
export class AustraliaController {
  constructor(private readonly australiaService: AustraliaService) {}

  @Patch()
  create(@Body() createAustraliaDto: CreateAustraliaDto) {
    return this.australiaService.set(createAustraliaDto);
  }


  @Get()
  findAll() {
    return this.australiaService.get();
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
