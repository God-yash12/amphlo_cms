import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhyamphloCardService } from './whyamphlo-card.service';
import { CreateWhyamphloCardDto } from './dto/create-whyamphlo-card.dto';
import { UpdateWhyamphloCardDto } from './dto/update-whyamphlo-card.dto';

@Controller('whyamphlo-card')
export class WhyamphloCardController {
  constructor(private readonly whyamphloCardService: WhyamphloCardService) { }

  @Post()
  create(@Body() createWhyamphloCardDto: CreateWhyamphloCardDto) {
    return this.whyamphloCardService.create(createWhyamphloCardDto);
  }

  @Get()
  findAll() {
    return this.whyamphloCardService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.whyamphloCardService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhyamphloCardDto: UpdateWhyamphloCardDto) {
    return this.whyamphloCardService.update(+id, updateWhyamphloCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whyamphloCardService.remove(+id);
  }
}
