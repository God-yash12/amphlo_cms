import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { WhyAmphloService } from './why-amphlo.service';
import { CreateWhyAmphloDto } from './dto/create-why-amphlo.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('why-amphlo')
@Controller('why-amphlo')
export class WhyAmphloController {
  constructor(private readonly whyAmphloService: WhyAmphloService) {}

  @Patch()
  @ApiOperation({ summary: 'Create or update a WhyAmphlo entry' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateWhyAmphloDto })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createWhyAmphloDto: CreateWhyAmphloDto, @UploadedFile() file: Express.Multer.File) {
    return this.whyAmphloService.set(createWhyAmphloDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all WhyAmphlo entries' })
  @ApiResponse({ status: 200, description: 'Return all WhyAmphlo entries.' })
  findAll() {
    return this.whyAmphloService.get();
  }
}
