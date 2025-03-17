import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOverviewDto } from './dto/create-overview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(Overview) private readonly overviewRepository: Repository<Overview>,
    private readonly fileUploadService: FileUploadService
  ) {}

  async set(dto: CreateOverviewDto) {
    const overviewData = await Promise.all(
      dto.overview.map(async (item) => {
        const image = await this.fileUploadService.getAllByIds([item.image]);
        if (!image || image.length === 0) {
          throw new NotFoundException(`Image with ID ${item.image} not found`);
        }

        const existingOverview = await this.get();
        if (!existingOverview) {
          return await this.createNew(item, image[0]);
        }

        return await this.update(existingOverview, item, image[0]);
      })
    );

    return overviewData;
  }

  async createNew(dto: any, image: FileUpload) {
    const newOverview = this.overviewRepository.create({
      title: dto.title,
      description: dto.description,
      images: [image],
    });
    return await this.overviewRepository.save(newOverview);
  }

  async update(existing: Overview, dto: any, image: FileUpload) {
    Object.assign(existing, {       
      ...dto,
      images: [image],
    });
    return await this.overviewRepository.save(existing);
  }

  async get(): Promise<Overview | null> {
    return this.overviewRepository.findOne({
      where: { id: Not(IsNull()) }, 
      relations: ['images'],
    });
  }
}
