import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { KeyFeaturesService } from './key-features.service';
import { CreateKeyFeatureDto } from './dto/create-key-feature.dto';
import { UpdateKeyFeatureDto } from './dto/update-key-feature.dto';

@ApiTags('key-features')
@Controller('key-features')
export class KeyFeaturesController {
  constructor(private readonly keyFeaturesService: KeyFeaturesService) {}

  @Patch()
  @ApiOperation({ summary: 'Create a new key feature' })
  @ApiBody({ type: CreateKeyFeatureDto })
  @ApiResponse({ status: 201, description: 'The key feature has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createKeyFeatureDto: CreateKeyFeatureDto) {
    return this.keyFeaturesService.set(createKeyFeatureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all key features' })
  @ApiResponse({ status: 200, description: 'List of all key features.' })
  findAll() {
    return this.keyFeaturesService.get();
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Retrieve a key feature by ID' })
  // @ApiParam({ name: 'id', description: 'ID of the key feature to retrieve' })
  // @ApiResponse({ status: 200, description: 'The key feature with the given ID.' })
  // @ApiResponse({ status: 404, description: 'Key feature not found.' })
  // findOne(@Param('id') id: string) {
  //   return this.keyFeaturesService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update a key feature by ID' })
  // @ApiParam({ name: 'id', description: 'ID of the key feature to update' })
  // @ApiBody({ type: UpdateKeyFeatureDto })
  // @ApiResponse({ status: 200, description: 'The key feature has been successfully updated.' })
  // @ApiResponse({ status: 404, description: 'Key feature not found.' })
  // update(@Param('id') id: string, @Body() updateKeyFeatureDto: UpdateKeyFeatureDto) {
  //   return this.keyFeaturesService.update(+id, updateKeyFeatureDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a key feature by ID' })
  // @ApiParam({ name: 'id', description: 'ID of the key feature to delete' })
  // @ApiResponse({ status: 200, description: 'The key feature has been successfully deleted.' })
  // @ApiResponse({ status: 404, description: 'Key feature not found.' })
  // remove(@Param('id') id: string) {
  //   return this.keyFeaturesService.remove(+id);
  // }
}
