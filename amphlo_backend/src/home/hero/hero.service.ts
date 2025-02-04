import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { get } from 'http';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero) private readonly heroRepository: Repository<Hero>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>
  ){ }
  async set(dto: CreateHeroDto) {
    const image = await this.fileUploadRepository.findOne({ where: {id: dto.image}})
    if(!image) throw new NotFoundException("Hero Image does not Found")

      const existing = await this.get();
      if(!existing) return await this.createNew(dto, image);

      return await this.update(existing, dto, image)
  }

  async createNew(dto: CreateHeroDto, image: FileUpload){
    const newHero = this.heroRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,
    })
    return this.heroRepository.save(newHero)
  }

  async update(existing:Hero, dto: CreateHeroDto, image:FileUpload){
    Object.assign(existing, {
      ...dto,
      image,
    })
    return await this.heroRepository.save(existing)
  }
  

  get(): Promise<Hero | null> {
    return this.heroRepository.findOne({
      where: { id: Not(IsNull())}, 
      relations: ['image'],
    })
  }
  
}
