import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeyFeatureCardDto } from './dto/create-key-feature-card.dto';
import { UpdateKeyFeatureCardDto } from './dto/update-key-feature-card.dto';
import { KeyFeatureCard } from './entities/key-feature-card.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class KeyFeatureCardService {

  constructor(
    @InjectRepository(KeyFeatureCard) private readonly keyFeatureCardRepo: Repository<KeyFeatureCard>,
    private readonly fileUploadService: FileUploadService
  ) { }
  async create(dto: CreateKeyFeatureCardDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])
    if (!image) throw new NotFoundException("Image doesn't exist");

    const createNew = this.keyFeatureCardRepo.create({
      title: dto.title,
      description: dto.description,
      image: image[0]
    });
    return this.keyFeatureCardRepo.save(createNew);
  }



  findAll() {
    return this.keyFeatureCardRepo.find({ relations: ['image'] })
  }


  async update(id: number, dto: UpdateKeyFeatureCardDto) {
    const keyFeatureCard = await this.keyFeatureCardRepo.findOne({ where: { id }, relations: ['image'] })
    if (!keyFeatureCard) throw new NotFoundException("Key Feature Card does not Found")

    if (dto.image) {
      const image = await this.fileUploadService.getAllByIds([dto.image])

      if (!image) {
        throw new NotFoundException("Image doesn't exist");
      }
      keyFeatureCard.image = image[0];
    }

    keyFeatureCard.title = dto.title
    keyFeatureCard.description = dto.description
    
    return this.keyFeatureCardRepo.save(keyFeatureCard)
  }

  async remove(id: number) {
    const card = await this.keyFeatureCardRepo.findOne({ where: { id } })
    if (!card) {
      throw new NotFoundException('Card doesnot Found')
    }
    await this.keyFeatureCardRepo.remove(card)
    return { message: "Key Feature Card has been Deleted " }
  }
}

