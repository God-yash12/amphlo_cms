import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWhyAmphloDto } from './dto/create-why-amphlo.dto';
import { UpdateWhyAmphloDto } from './dto/update-why-amphlo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WhyAmphlo } from './entities/why-amphlo.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class WhyAmphloService {
  constructor(
    @InjectRepository(WhyAmphlo) private readonly whyAmplhoRepository: Repository<WhyAmphlo>,
    private readonly fileUploadService: FileUploadService,
  ) { }
  async set(dto: CreateWhyAmphloDto) {
    const image = await this.fileUploadService.getAllByIds([dto.imageId])
      if (!image) throw new NotFoundException("Image not found")

    const existing = await this.get()

    if (!existing) return await this.createNew(dto, image[0])

    return await this.update(existing, dto, image[0])
  }

  async createNew (dto: CreateWhyAmphloDto, image: FileUpload) {
    const newWhyAmphlo = this.whyAmplhoRepository.create({
      title: dto.title,
      mainTitle: dto.mainTitle,
      description: dto.description,
      lists: dto.lists,
      image,
    })
    return await this.whyAmplhoRepository.save(newWhyAmphlo)
  }

  async update(existing: WhyAmphlo, dto: CreateWhyAmphloDto, image: FileUpload){
     Object.assign(existing, {
      ...dto,
      image
     })
     return await this.whyAmplhoRepository.save(existing)
  }

  async get(): Promise<WhyAmphlo | null> {
    const whyAmphlo = await this.whyAmplhoRepository.findOne({
      where: { id: Not(IsNull())}, 
      relations: ['image'],
    })
    if(!whyAmphlo) return null
    return whyAmphlo
  }

}
