import { Controller, Get, Post, Body, Patch, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { HomeTransformService } from './home-transform.service';
import { CreateHomeTransformDto } from './dto/create-home-transform.dto';


@ApiTags('transform')
@Controller('transform')
export class HomeTransformController {
  constructor(private readonly homeTransformService: HomeTransformService) {}

  @Patch()
  @ApiOperation({ summary: 'Set home transform with image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateHomeTransformDto })
  @ApiResponse({ status: 201, description: 'The home transform has been successfully set.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  set(@Body() dto: CreateHomeTransformDto) {
    return this.homeTransformService.set(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all home transforms' })
  @ApiResponse({ status: 200, description: 'Return all home transforms.' })
  findAll() {
    return this.homeTransformService.get();
  }

}
