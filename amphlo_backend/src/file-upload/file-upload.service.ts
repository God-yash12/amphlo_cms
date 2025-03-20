import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { FileUpload } from './entities/file-upload.entity';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(FileUpload)
    private readonly fileUploadRepo: Repository<FileUpload>,
    private readonly configService: ConfigService,
  ) { }

  async create(createFileUploadDto: CreateFileUploadDto) {
    if (!createFileUploadDto.files || createFileUploadDto.files.length === 0) {
      throw new BadRequestException('No files provided for upload.');
    }

    const backendUrl = this.configService.get('BACKEND_URL');

    const files = createFileUploadDto.files.map(file => {
      if (!file.path) {
        throw new BadRequestException(`File path missing for ${file.originalName}`);
      }

      let cleanedPath = file.path.replace(/\\/g, '/');

      cleanedPath = cleanedPath.replace(/.*?(\/uploads\/)/, '$1');

      return this.fileUploadRepo.create({
        filename: file.originalName,
        mimetype: file.mimeType,
        url: `${backendUrl}${cleanedPath}`,
      });
    });

    await this.fileUploadRepo.save(files);

    return files.map(({ id, filename, url }) => ({
      id,
      url,
      originalName: filename,
    }));
  }

  async getAllByIds(ids: number[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No valid file IDs provided.');
    }

    return this.fileUploadRepo.find({
      where: { id: In(ids) },
      select: ['id', 'url', 'filename'],
    });
  }

  async removeFile(id: number) {
    this.fileUploadRepo.delete({ id });
  }
}
