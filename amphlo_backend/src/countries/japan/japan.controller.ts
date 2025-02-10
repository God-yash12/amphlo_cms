import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JapanService } from './japan.service';
import { CreateJapanDto } from './dto/create-japan.dto';
import { UpdateJapanDto } from './dto/update-japan.dto';

@Controller('japan')
export class JapanController {
  constructor(private readonly japanService: JapanService) {}

  @Patch()
  create(@Body() createJapanDto: CreateJapanDto) {
    return this.japanService.set(createJapanDto);
  }

  @Get()
  findAll() {
    return this.japanService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.japanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJapanDto: UpdateJapanDto) {
  //   return this.japanService.update(+id, updateJapanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.japanService.remove(+id);
  // }
}
