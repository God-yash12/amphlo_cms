import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NetherlandsService } from './netherlands.service';
import { CreateNetherlandsDto } from './dto/create-netherland.dto';
// import { UpdateNetherlandsDto } from './dto/update-netherland.dto';

@Controller('netherlands')
export class NetherlandsController {
  constructor(private readonly netherlandsService: NetherlandsService) {}

  @Patch()
  create(@Body() createNetherlandDto: CreateNetherlandsDto) {
    return this.netherlandsService.set(createNetherlandDto);
  }


  @Get()
  findAll() {
    return this.netherlandsService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.netherlandsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNetherlandDto: UpdateNetherlandDto) {
  //   return this.netherlandsService.update(+id, updateNetherlandDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.netherlandsService.remove(+id);
  // }
}
