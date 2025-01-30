import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { HomeAboutService } from './home-about.service';
import { CreateHomeAboutDto } from './dto/create-home-about.dto';
import { UpdateHomeAboutDto } from './dto/update-home-about.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';
import { fileFilterConfig } from 'src/config/file-filter.config';
import { HomeAbout } from './entities/home-about.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { dot } from 'node:test/reporters';

@Controller('home-about')
export class HomeAboutController {
  constructor(private readonly homeAboutService: HomeAboutService) { }

  @Patch()
  @UseInterceptors(FileInterceptor("image", {
    storage: storageConfig,
    fileFilter: fileFilterConfig
  }))
  async create(@Body() dot: CreateHomeAboutDto,
    @UploadedFile() file: Express.Multer.File) {
    return await this.homeAboutService.set(dot);
  }

  @Get()
  async findAll() {
    return this.homeAboutService.get();
  }
}
