import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';
import { fileFilterConfig } from 'src/config/file-filter.config';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Patch()
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig,
    fileFilter: fileFilterConfig,
  }))
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


