import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniFeatureDto } from './dto/create-uni-feature.dto';
import { UpdateUniFeatureDto } from './dto/update-uni-feature.dto';
import { UniFeature } from './entities/uni-feature.entity';
import { Repository, IsNull, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class UniFeatureService {
  constructor(
    @InjectRepository(UniFeature)
    private readonly uniFeatureRepository: Repository<UniFeature>,
    private readonly fileUploadService: FileUploadService,
  ) { }

  async set(dto: CreateUniFeatureDto) {

    let image = null;
    if (dto.image) {
      image = await this.fileUploadService.getAllByIds([dto.image]);
    }
    const existing = await this.get();
    if (!existing) {
      return await this.createNewFeature(dto, image[0])
    }

    await this.updateFeature(existing, dto, image[0]);
  }

  async createNewFeature(dto: CreateUniFeatureDto, image: FileUpload) {
    const newUniFeature = this.uniFeatureRepository.create({
      title: dto.title,
      description: dto.description,
      image: image ? image[0] : null,
    });
    return this.uniFeatureRepository.save(newUniFeature);
  }

  async updateFeature(existing: UniFeature, dto: CreateUniFeatureDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image: image,
    })
    return await this.uniFeatureRepository.save(existing)
  }

  async get() {
    return await this.uniFeatureRepository.findOne({ where: { id: Not(IsNull()) }, relations: ['image'] });
  }

}
