import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureCardDto } from './dto/create-feature-card.dto';
import { UpdateFeatureCardDto } from './dto/update-feature-card.dto';
import { FeatureCard } from './entities/feature-card.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class FeatureCardsService {
  constructor(
    @InjectRepository(FeatureCard)
    private readonly featureCardRepo: Repository<FeatureCard>,
    private readonly fileUploadService: FileUploadService
  ) {}

  async create(dto: CreateFeatureCardDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])
    if (!image) {
      throw new NotFoundException("Image not found");
    }

    const newFeatureCard = this.featureCardRepo.create({
      title: dto.title,
      description: dto.description,
      image: image[0],
    });

    return this.featureCardRepo.save(newFeatureCard);
  }

  findAll() {
    return this.featureCardRepo.find({relations: ['image']});
  }

  // Optionally implement findOne, update and remove if needed
  async findOne(id: number) {
    const featureCard = await this.featureCardRepo.findOne({ where: { id }, relations: ['image'] });
    if (!featureCard) {
      throw new NotFoundException(`FeatureCard with id ${id} not found`);
    }
    return featureCard;
  }

  async update (id: number, dto: UpdateFeatureCardDto) {
    const card = await this.featureCardRepo.findOne({where: {id}, relations: ['image']})
    if(!card) {
      throw new NotFoundException('Data does not  Found')
    }

    if(dto.image) {
      const image = await this.fileUploadService.getAllByIds([dto.image])
      if(!image){
        throw new NotFoundException('Image does not  Found')
      }
      card.image = image[0]
    }

    card.title = dto.title || card.title;
    card.description = dto.description || card.description;

    await this.featureCardRepo.save(card)
    return {message: 'FeatureCard updated successfully ' }
  }

  async remove(id: number) {
    const result = await this.featureCardRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FeatureCard with id ${id} not found`);
    }
    return { message: 'FeatureCard deleted successfully' };
  }
}
