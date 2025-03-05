import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureCardDto } from './dto/create-feature-card.dto';
import { UpdateFeatureCardDto } from './dto/update-feature-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureCard } from './entities/feature-card.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class FeatureCardService {
  constructor(
    @InjectRepository(FeatureCard) private readonly featureCardrepo: Repository<FeatureCard>,
    private readonly fileUploadService: FileUploadService
  ) { }
  async create(dto: CreateFeatureCardDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])
    if (!image) {
      throw new NotFoundException("Feature Image Not Found")
    } 
    const newCard = this.featureCardrepo.create({
      title: dto.title,
      description: dto.description,
      image: image[0],
    })
    await this.featureCardrepo.save(newCard)
    return { mesage: "Card created" }
  }

  findAll() {
    return this.featureCardrepo.find({ relations: ['image'] })
  }

  async update(id: number, dto: UpdateFeatureCardDto) {
      const keyFeatureCard = await this.featureCardrepo.findOne({ where: { id }, relations: ['image'] })
      if (!keyFeatureCard) throw new NotFoundException("University Feature Card does not Found")
  
      if (dto.image) {
        const image = await this.fileUploadService.getAllByIds([dto.image])
  
        if (!image) {
          throw new NotFoundException("Image doesn't exist");
        }
        keyFeatureCard.image = image[0];
      }
  
      keyFeatureCard.title = dto.title 
      keyFeatureCard.description = dto.title 
      
      return this.featureCardrepo.save(keyFeatureCard)
    }

  async remove(id: number) {
    const card = await this.featureCardrepo.findOne({ where: { id } })
    if (!card) {
      throw new NotFoundException('Card doesnot Found')
    }
    await this.featureCardrepo.remove(card)
    return { message: "Key Feature Card has been Deleted " }
  }
}

