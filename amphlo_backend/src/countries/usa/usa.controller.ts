import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsaService } from './usa.service';
import { CreateUsaDto } from './dto/create-usa.dto';
import { UpdateUsaDto } from './dto/update-usa.dto';

@Controller('usa')
export class UsaController {
  constructor(private readonly usaService: UsaService) {}

  @Patch()
  create(@Body() createUsaDto: CreateUsaDto) {
    return this.usaService.set(createUsaDto);
  }

  @Get()
  findAll() {
    return this.usaService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsaDto: UpdateUsaDto) {
  //   return this.usaService.update(+id, updateUsaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usaService.remove(+id);
  // }
}
