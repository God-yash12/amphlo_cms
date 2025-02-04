import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWhyAmphloDto } from './dto/create-why-amphlo.dto';
import { UpdateWhyAmphloDto } from './dto/update-why-amphlo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WhyAmphlo } from './entities/why-amphlo.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class WhyAmphloService {
  constructor(
    @InjectRepository(WhyAmphlo) private readonly whyAmplhoRepository: Repository<WhyAmphlo>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>
  ) { }
  async set(dto: CreateWhyAmphloDto) {
    const image = await this.fileUploadRepository.findOne({ where: { id: dto.image } })
    if (!image) throw new NotFoundException("Image not found")

    const existing = await this.get()

    if (!existing) return await this.createNew(dto, image)

    return await this.update(existing, dto, image)
  }

  async createNew (dto: CreateWhyAmphloDto, image: FileUpload) {
    const newWhyAmphlo = this.whyAmplhoRepository.create({
      title: dto.title,
      mainTitle: dto.mainTitle,
      description: dto.description,
      image
    })
    return await this.whyAmplhoRepository.save(newWhyAmphlo)
  }

  async update(existing: WhyAmphlo, dto: CreateWhyAmphloDto, image: FileUpload){
     Object.assign(existing, {
      ...dto,
      image,
     })
     return await this.whyAmplhoRepository.save(existing)
  }

  get(): Promise<WhyAmphlo | null> {
    return this.whyAmplhoRepository.findOne({
      where: { id: Not(IsNull())}, 
      relations: ['image'],
    })
  }

  findAll() {
    return this.whyAmplhoRepository.find({
      relations: ['image'],
    })
  }

}
