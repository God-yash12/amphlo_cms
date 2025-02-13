import { Injectable } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from './entities/file-upload.entity';
import { In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {

  constructor(
    @InjectRepository(FileUpload) private fileUploadRepo: Repository<FileUpload>,
    private readonly configService: ConfigService,
  ) { }

  async create(createFileUploadDto: CreateFileUploadDto) {

    const backendUrl = this.configService.get('BACKEND_URL') || 'http://localhost:5000';

    const files = this.fileUploadRepo.create(
      createFileUploadDto.files.map(file => ({
        filename: file.originalName,
        mimetype: file.mimeType,
        url: `${backendUrl}/uploads/${file.path.split('\\').pop()}`
      }))
    );

    await this.fileUploadRepo.save(files);

    return files.map(file => ({
      id: file.id,
      url: file.url,
      originalName: file.filename,
    }));
  }

  async getAllByIds(ids: number[]) {
    return this.fileUploadRepo.find({ where: { id: In(ids) }, select: { id: true } });
  }
}
