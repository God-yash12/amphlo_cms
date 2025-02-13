import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureHero } from './entities/hero.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(FeatureHero) private readonly featureHerpRepository: Repository<FeatureHero>,
    private readonly fileUploadService: FileUploadService
  ) { }
  async set(dto: CreateHeroDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])
    if(!image) throw new NotFoundException("Hero Image does not Found")

      const existing = await this.get();
      if(!existing) return await this.createNew(dto, image[0]);

      return await this.update(existing, dto, image[0])
  }

  async createNew(dto: CreateHeroDto, image: FileUpload){
    const newHero = this.featureHerpRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,
    })
    return this.featureHerpRepository.save(newHero)
  }

  async update(existing:FeatureHero, dto: CreateHeroDto, image:FileUpload){
    Object.assign(existing, {       
      ...dto,
      image,
    })
    return await this.featureHerpRepository.save(existing)
  }
  

  get(): Promise<FeatureHero | null> {
    return this.featureHerpRepository.findOne({
      where: { id: Not(IsNull())}, 
      relations: ['image'],
    })
  }
  
}
