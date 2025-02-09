import { Injectable } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from './entities/file-upload.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Injectable()
export class FileUploadService {

  constructor(
    @InjectRepository(FileUpload) private fileUploadRepo: Repository<FileUpload>,
    private readonly configService: ConfigService,
  ) { }

  async create(createFileUploadDto: CreateFileUploadDto, file: Express.Multer.File) {

    const backendUrl = this.configService.get('BACKEND_URL') || 'http://localhost:5000';
    const fileUrl = new URL(`uploads/${file.filename}`, backendUrl).toString();

    const fileUpload = this.fileUploadRepo.create({
      ...createFileUploadDto,
      filename: file.originalname,
      mimetype: file.mimetype,
    url: fileUrl
    });

    return await this.fileUploadRepo.save(fileUpload)
  }

  
}
