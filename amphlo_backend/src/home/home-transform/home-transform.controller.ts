import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { HomeTransformService } from './home-transform.service';
import { CreateHomeTransformDto } from './dto/create-home-transform.dto';
import { UpdateHomeTransformDto } from './dto/update-home-transform.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';
import { fileFilterConfig } from 'src/config/file-filter.config';

@ApiTags('transform')
@Controller('transform')
export class HomeTransformController {
  constructor(private readonly homeTransformService: HomeTransformService) {}

  @Patch()
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig,
    fileFilter: fileFilterConfig,
  }))
  @ApiOperation({ summary: 'Set home transform with image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateHomeTransformDto })
  @ApiResponse({ status: 201, description: 'The home transform has been successfully set.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  set(@Body() dto: CreateHomeTransformDto, @UploadedFile() file: Express.Multer.File) {
    return this.homeTransformService.set(dto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all home transforms' })
  @ApiResponse({ status: 200, description: 'Return all home transforms.' })
  findAll() {
    return this.homeTransformService.get();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a home transform by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the home transform' })
  @ApiResponse({ status: 200, description: 'Return a single home transform.' })
  @ApiResponse({ status: 404, description: 'Home transform not found.' })
  findOne(@Param('id') id: string) {
    return this.homeTransformService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a home transform by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the home transform' })
  @ApiBody({ type: UpdateHomeTransformDto })
  @ApiResponse({ status: 200, description: 'The home transform has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Home transform not found.' })
  update(@Param('id') id: string, @Body() updateHomeTransformDto: UpdateHomeTransformDto) {
    return this.homeTransformService.update(+id, updateHomeTransformDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a home transform by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the home transform' })
  @ApiResponse({ status: 200, description: 'The home transform has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Home transform not found.' })
  remove(@Param('id') id: string) {
    return this.homeTransformService.remove(+id);
  }
}
