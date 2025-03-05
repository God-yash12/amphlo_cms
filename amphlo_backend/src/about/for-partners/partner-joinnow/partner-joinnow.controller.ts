import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerJoinnowService } from './partner-joinnow.service';
import { CreatePartnerJoinnowDto } from './dto/create-partner-joinnow.dto';
import { UpdatePartnerJoinnowDto } from './dto/update-partner-joinnow.dto';

@Controller('partner-joinnow')
export class PartnerJoinnowController {
  constructor(private readonly partnerJoinnowService: PartnerJoinnowService) {}

  @Patch()
  set(@Body() createPartnerJoinnowDto: CreatePartnerJoinnowDto) {
    return this.partnerJoinnowService.set(createPartnerJoinnowDto);
  }

  @Get()
  findAll() {
    return this.partnerJoinnowService.get();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.partnerJoinnowService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePartnerJoinnowDto: UpdatePartnerJoinnowDto) {
  //   return this.partnerJoinnowService.update(+id, updatePartnerJoinnowDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.partnerJoinnowService.remove(+id);
  // }
}
