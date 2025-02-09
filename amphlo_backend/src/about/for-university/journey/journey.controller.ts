import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';

@Controller('university-journey')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Patch()
  set(@Body() createJourneyDto: CreateJourneyDto) {
    return this.journeyService.set(createJourneyDto);
  }

  @Get()
  findAll() {
    return this.journeyService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.journeyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJourneyDto: UpdateJourneyDto) {
  //   return this.journeyService.update(+id, updateJourneyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.journeyService.remove(+id);
  // }
}
