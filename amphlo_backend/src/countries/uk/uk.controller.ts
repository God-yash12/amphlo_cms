import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UkService } from './uk.service';
import { CreateUkDto } from './dto/create-uk.dto';
import { UpdateUkDto } from './dto/update-uk.dto';

@Controller('uk')
export class UkController {
  constructor(private readonly ukService: UkService) {}

  @Patch()
  create(@Body() createUkDto: CreateUkDto) {
    return this.ukService.set(createUkDto);
  }

  @Get()
  findAll() {
    return this.ukService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ukService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUkDto: UpdateUkDto) {
  //   return this.ukService.update(+id, updateUkDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ukService.remove(+id);
  // }
}
