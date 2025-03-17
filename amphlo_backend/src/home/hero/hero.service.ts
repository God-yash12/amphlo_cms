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
    let image = null;
    if (dto.imageId) {
      image = await this.fileUploadService.getAllByIds([dto.imageId]);
    }

    const existing = await this.get();
    if (!existing) return await this.createNew(dto, image ? image[0] : null);

    const uodatedto = await this.update(existing, dto, image ? image[0] : null)
    return (uodatedto)
  }


  async createNew(dto: CreateHeroDto, image: FileUpload) {
    const newHero = this.heroRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons || null,
      image: image,
    })
    const heroItem = await this.heroRepository.save(newHero)
    return { heroItem }
  }

  async update(existing: Hero, dto: CreateHeroDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      buttons: dto.buttons || null,
      image: image,
    })

    const saved = await this.heroRepository.save(existing)
    
    return saved;
  }


  get(): Promise<Hero | null> {
    return this.heroRepository.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image'],
    })
  }

}
