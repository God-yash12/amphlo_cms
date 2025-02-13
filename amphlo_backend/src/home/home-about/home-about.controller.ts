import { Controller, Get, Body, Patch, UseInterceptors, ValidationPipe, UsePipes } from '@nestjs/common';
import { HomeAboutService } from './home-about.service';
import { CreateHomeAboutDto } from './dto/create-home-about.dto';

@Controller('home-about')
export class HomeAboutController {
  constructor(private readonly homeAboutService: HomeAboutService) { }

  @Patch()
  async create(@Body() dto: CreateHomeAboutDto) {
    return await this.homeAboutService.set(dto);
  }

  @Get()
  async findAll() {
    return this.homeAboutService.get();
  }
}
