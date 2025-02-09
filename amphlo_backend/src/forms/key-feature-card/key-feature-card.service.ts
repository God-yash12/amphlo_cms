import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeyFeatureCardDto } from './dto/create-key-feature-card.dto';
import { UpdateKeyFeatureCardDto } from './dto/update-key-feature-card.dto';
import { KeyFeatureCard } from './entities/key-feature-card.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class KeyFeatureCardService {

  constructor(
    @InjectRepository(KeyFeatureCard) private readonly keyFeatureCardRepo: Repository<KeyFeatureCard>,
    @InjectRepository(FileUpload) private readonly fileUploadRepo: Repository<FileUpload>
  ) { }
  async create(dto: CreateKeyFeatureCardDto) {
    const image = await this.fileUploadRepo.findOne({ where: { id: dto.image } })
    if (!image) throw new NotFoundException("Image doesn't Found")
    const createNew = this.keyFeatureCardRepo.create({
      title: dto.title,
      description: dto.description,
      image,
    })
    return this.keyFeatureCardRepo.save(createNew)
  }



  findAll() {
    return this.keyFeatureCardRepo.find({relations: ['image']})
  }

}

// findOne(id: number) {
//   return `This action returns a #${id} keyFeatureCard`;
// }

// update(id: number, updateKeyFeatureCardDto: UpdateKeyFeatureCardDto) {
//   return `This action updates a #${id} keyFeatureCard`;
// }

// remove(id: number) {
//   return this.keyFeatureCardRepo.Delete
// }
// }
