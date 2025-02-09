import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniWhyamphloService } from './uni-whyamphlo.service';
import { CreateUniWhyamphloDto } from './dto/create-uni-whyamphlo.dto';
import { UpdateUniWhyamphloDto } from './dto/update-uni-whyamphlo.dto';

@Controller('uni-whyamphlo')
export class UniWhyamphloController {
  constructor(private readonly uniWhyamphloService: UniWhyamphloService) {}

  @Patch()
  create(@Body() createUniWhyamphloDto: CreateUniWhyamphloDto) {
    return this.uniWhyamphloService.set(createUniWhyamphloDto);
  }

  @Get()
  findAll() {
    return this.uniWhyamphloService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.uniWhyamphloService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUniWhyamphloDto: UpdateUniWhyamphloDto) {
  //   return this.uniWhyamphloService.update(+id, updateUniWhyamphloDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.uniWhyamphloService.remove(+id);
  // }
}
