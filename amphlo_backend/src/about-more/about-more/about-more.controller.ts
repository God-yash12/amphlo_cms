import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AboutMoreService } from './about-more.service';
import { CreateAboutMoreDto } from './dto/create-about-more.dto';
import { UpdateAboutMoreDto } from './dto/update-about-more.dto';

@Controller('amphlo-journey')
export class AboutMoreController {
  constructor(private readonly aboutMoreService: AboutMoreService) {}

  @Patch()
  create(@Body() createAboutMoreDto: CreateAboutMoreDto) {
    return this.aboutMoreService.set(createAboutMoreDto);
  }

  @Get()
  findAll() {
    return this.aboutMoreService.get();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.aboutMoreService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAboutMoreDto: UpdateAboutMoreDto) {
  //   return this.aboutMoreService.update(+id, updateAboutMoreDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutMoreService.remove(+id);
  }
}
