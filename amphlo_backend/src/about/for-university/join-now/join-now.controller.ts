import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JoinNowService } from './join-now.service';
import { CreateJoinNowDto } from './dto/create-join-now.dto';
import { UpdateJoinNowDto } from './dto/update-join-now.dto';

@Controller('join-now-university')
export class JoinNowController {
  constructor(private readonly joinNowService: JoinNowService) {}

  @Patch()
  set(@Body() createJoinNowDto: CreateJoinNowDto) {
    return this.joinNowService.set(createJoinNowDto);
  }

  @Get()
  findAll() {
    return this.joinNowService.get();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.joinNowService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJoinNowDto: UpdateJoinNowDto) {
  //   return this.joinNowService.update(+id, updateJoinNowDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.joinNowService.remove(+id);
  // }
}
