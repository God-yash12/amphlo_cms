import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FranceService } from './france.service';
import { CreateFranceDto } from './dto/create-france.dto';
import { UpdateFranceDto } from './dto/update-france.dto';

@Controller('france')
export class FranceController {
  constructor(private readonly franceService: FranceService) {}

  @Patch()
  create(@Body() createFranceDto: CreateFranceDto) {
    return this.franceService.set(createFranceDto);
  }


  @Get()
  findAll() {
    return this.franceService.get();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.franceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFranceDto: UpdateFranceDto) {
  //   return this.franceService.update(+id, updateFranceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.franceService.remove(+id);
  // }
}
