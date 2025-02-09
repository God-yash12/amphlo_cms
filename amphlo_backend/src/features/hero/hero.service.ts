import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureHero } from './entities/hero.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(FeatureHero) private readonly featureHerpRepository: Repository<FeatureHero>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>
  ) { }
  async set(dto: CreateHeroDto) {
    const image = await this.fileUploadRepository.findOne({ where: { id: dto.image } })
    if (!image) throw new NotFoundException("Hero Image does not Found")

    const existing = await this.get()

    if (!existing) return await this.createNewHero(dto, image)

    return await this.updateHero(existing, dto, image)
  }

  createNewHero(dto: CreateHeroDto, image:FileUpload) {
    const newHeroData = this.featureHerpRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image
    })
    return this.featureHerpRepository.save(newHeroData)
  }

  updateHero (existing: FeatureHero, dto: CreateHeroDto, image: FileUpload ){
    Object.assign({
      ...dto,
      image
    })
    return this.featureHerpRepository.save(existing)
  }

  get(): Promise<FeatureHero> {
    return this.featureHerpRepository.findOne({
      where: {id: Not(IsNull())},
      relations: ['image'],
    })
  }



  findAll() {
    return `This action returns all hero`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hero`;
  }

  update(id: number, updateHeroDto: UpdateHeroDto) {
    return `This action updates a #${id} hero`;
  }

  remove(id: number) {
    return `This action removes a #${id} hero`;
  }
}
