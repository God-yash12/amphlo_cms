import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero) private readonly heroRepository: Repository<Hero>,
    private readonly fileUploadService: FileUploadService
  ) { }

  async set(dto: CreateHeroDto) {
    const image = await this.fileUploadService.getAllByIds([dto.imageId])

    const existing = await this.get();
    if (!existing) return await this.createNew(dto, image[0]);

    return await this.update(existing, dto, image[0])
  }

  async createNew(dto: CreateHeroDto, image: FileUpload) {
    const newHero = this.heroRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image: image[0],
    })
    return this.heroRepository.save(newHero)
  }

  async update(existing: Hero, dto: CreateHeroDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image,
    })
    return await this.heroRepository.save(existing)
  }


  get(): Promise<Hero | null> {
    return this.heroRepository.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image'],
    })
  }

}
