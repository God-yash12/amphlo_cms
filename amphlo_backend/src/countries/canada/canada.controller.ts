import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanadaService } from './canada.service';
import { CreateCanadaDto } from './dto/create-canada.dto';
import { UpdateCanadaDto } from './dto/update-canada.dto';

@Controller('canada')
export class CanadaController {
  constructor(private readonly canadaService: CanadaService) {}

  @Patch()
  create(@Body() createCanadaDto: CreateCanadaDto) {
    return this.canadaService.set(createCanadaDto);
  }

  @Get()
  findAll() {
    return this.canadaService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.canadaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCanadaDto: UpdateCanadaDto) {
  //   return this.canadaService.update(+id, updateCanadaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.canadaService.remove(+id);
  // }
}
