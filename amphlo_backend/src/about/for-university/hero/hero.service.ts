import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { AboutHero } from './entities/hero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { Hero } from 'src/home/hero/entities/hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(AboutHero)
    private readonly aboutHeroRepository: Repository<AboutHero>,
    @InjectRepository(FileUpload)
    private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}


  async set(createHeroDto: CreateHeroDto) {
    const image = await this.fileUploadRepository.findOne({ where: { id: createHeroDto.image } });
    if (!image) throw new NotFoundException("Hero Image does not Found");

    const existing = await this.get();
    if (!existing) {
      const newHero = this.aboutHeroRepository.create({
        title: createHeroDto.title,
        subTitle: createHeroDto.subTitle,
        image: image,
      });
      return this.aboutHeroRepository.save(newHero);
    }

    return await this.update(existing, createHeroDto, image);
  }


  async update(existing:AboutHero, dto: CreateHeroDto, image:FileUpload){
    Object.assign(existing, {
      ...dto,
      image,
    })
    return await this.aboutHeroRepository.save(existing)
  }

  
  get(): Promise<AboutHero | null> {
    return this.aboutHeroRepository.findOne({
      where: { id: Not(IsNull())}, 
      relations: ['image'],
    })

  }
  
  }


  // findAll() {
  //   return `This action returns all hero`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} hero`;
  // }

  // update(id: number, updateHeroDto: UpdateHeroDto) {
  //   return `This action updates a #${id} hero`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} hero`;
  // }
// }
