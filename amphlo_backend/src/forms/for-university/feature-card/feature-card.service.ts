import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureCardDto } from './dto/create-feature-card.dto';
import { UpdateFeatureCardDto } from './dto/update-feature-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureCard } from './entities/feature-card.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class FeatureCardService {
  constructor(
    @InjectRepository(FeatureCard) private readonly featureCardrepo: Repository<FeatureCard>,
    @InjectRepository(FileUpload) private readonly fileUploadRepo: Repository<FileUpload>
  ){}
  async create(dto: CreateFeatureCardDto) {
    const image  = await this.fileUploadRepo.findOne({where: {id: dto.image}})
    if(!image) {
      throw new NotFoundException("Feature Image Not Found")
    }
    const newCard = this.featureCardrepo.create({
      title: dto.title,
      description: dto.description,
      image,
    })
     await this.featureCardrepo.save(newCard)
     return {mesage: "Card created"}
  }

  findAll() {
    return this.featureCardrepo.find({relations: ['image']})
  }

  findOne(id: number) {
    return `This action returns a #${id} featureCard`;
  }

  update(id: number, updateFeatureCardDto: UpdateFeatureCardDto) {
    return `This action updates a #${id} featureCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} featureCard`;
  }
}
