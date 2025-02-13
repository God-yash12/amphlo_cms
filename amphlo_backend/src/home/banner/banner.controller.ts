import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Patch()

  create(@Body() createBannerDto: CreateBannerDto,
   @UploadedFile() file: Express.Multer.File,
) {
    return this.bannerService.set(createBannerDto);
  }

  @Get()
  findAll() {
    return this.bannerService.get();
  }

}


