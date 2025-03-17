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

    const newCard = this.featureCardrepo.create({
      title: dto.title,
      description: dto.description,
    })
    const cardData = await this.featureCardrepo.save(newCard)
    return { mesage: "Card created", cardData }
  }

  findAll() {
    return this.featureCardrepo.find()
  }

  async update(id: number, dto: UpdateFeatureCardDto) {
    const keyFeatureCard = await this.featureCardrepo.findOne({ where: { id } })
    if (!keyFeatureCard) throw new NotFoundException("University Feature Card does not Found")

    keyFeatureCard.title = dto.title
    keyFeatureCard.description = dto.description

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

