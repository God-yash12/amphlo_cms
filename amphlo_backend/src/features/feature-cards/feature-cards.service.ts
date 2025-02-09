import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureCardDto } from './dto/create-feature-card.dto';
import { UpdateFeatureCardDto } from './dto/update-feature-card.dto';
import { FeatureCard } from './entities/feature-card.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeatureCardsService {
  constructor(
    @InjectRepository(FeatureCard)
    private readonly featureCardRepo: Repository<FeatureCard>,
    @InjectRepository(FileUpload)
    private readonly fileUploadRepo: Repository<FileUpload>,
  ) {}

  async create(dto: CreateFeatureCardDto) {
    const image = await this.fileUploadRepo.findOne({ where: { id: dto.image } });
    if (!image) {
      throw new NotFoundException("Image not found");
    }

    const newFeatureCard = this.featureCardRepo.create({
      title: dto.title,
      description: dto.description,
      image,
    });

    return this.featureCardRepo.save(newFeatureCard);
  }

  // Use find() to return all FeatureCards
  findAll() {
    return this.featureCardRepo.find({relations: ['image']});
  }

  // Optionally implement findOne, update and remove if needed
  async findOne(id: number) {
    const featureCard = await this.featureCardRepo.findOne({ where: { id } });
    if (!featureCard) {
      throw new NotFoundException(`FeatureCard with id ${id} not found`);
    }
    return featureCard;
  }
  async remove(id: number) {
    const result = await this.featureCardRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FeatureCard with id ${id} not found`);
    }
    return { message: 'FeatureCard deleted successfully' };
  }
}
