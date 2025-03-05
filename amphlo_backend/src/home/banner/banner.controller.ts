import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Patch()
  @ApiOperation({ summary: 'Create or Update a new banner' })
  @ApiResponse({ status: 201, description: 'The banner has been successfully created / Updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.set(createBannerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all banners' })
  @ApiResponse({ status: 200, description: 'List of banners retrieved successfully.' })
  findAll() {
    return this.bannerService.get();
  }
}


