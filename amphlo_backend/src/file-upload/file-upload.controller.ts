import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post()
  @FormDataRequest()
  async create(@Body() createFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.create(createFileUploadDto);
  }

  @Delete(':id')
  removeFile(@Param('id', ParseIntPipe) id: string) {
    return this.fileUploadService.removeFile(+id);
  }
}
