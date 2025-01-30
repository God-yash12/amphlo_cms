import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';
import { fileFilterConfig } from 'src/config/file-filter.config';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: storageConfig,
    fileFilter: fileFilterConfig
  }))

  async create(@Body() createFileUploadDto: CreateFileUploadDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const fileUpload = await this.fileUploadService.create(createFileUploadDto, file);
    return { id: fileUpload.id, filename: fileUpload.filename}
  }

}
