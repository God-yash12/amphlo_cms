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
  ) {}


  async set(createHeroDto: CreateHeroDto) {
    const image = await this.fileUploadService.getAllByIds([createHeroDto.image])
    if (!image) throw new NotFoundException("Hero Image does not Found");

    const existing = await this.get();
    if (!existing) {
      const newHero = this.aboutHeroRepository.create({
        title: createHeroDto.title,
        subTitle: createHeroDto.subTitle,
        image:image[0]
      });
      return this.aboutHeroRepository.save(newHero);
    }

    return await this.update(existing, createHeroDto, image[0]);
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
