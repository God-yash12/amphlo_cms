import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { AboutHero } from './entities/hero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { Hero } from 'src/home/hero/entities/hero.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(AboutHero)
    private readonly aboutHeroRepository: Repository<AboutHero>,
    private readonly fileUploadService: FileUploadService
  ) { }


  async set(createHeroDto: CreateHeroDto) {
    let image = null;
    if (createHeroDto.image) {
      image = await this.fileUploadService.getAllByIds([createHeroDto.image]);
    }
    const existing = await this.get();
    if (!existing) {
      return await this.createNewHero(createHeroDto, image ? image[0] : null)
    }

    return await this.update(existing, createHeroDto, image ? image[0] : null);
  }

  async createNewHero(createHeroDto: CreateHeroDto, image: FileUpload) {
    const newHero = this.aboutHeroRepository.create({
      title: createHeroDto.title,
      subTitle: createHeroDto.subTitle,
      image: image,
    });
    return this.aboutHeroRepository.save(newHero);
  }

  async update(existing: AboutHero, dto: CreateHeroDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image: image,
    })
    return await this.aboutHeroRepository.save(existing)
  }


  get(): Promise<AboutHero | null> {
    return this.aboutHeroRepository.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image'],
    })

  }

}

