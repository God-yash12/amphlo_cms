import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerHeroDto } from './dto/create-partner-hero.dto';
import { UpdatePartnerHeroDto } from './dto/update-partner-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerHero } from './entities/partner-hero.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class PartnerHeroService {
  constructor(
    @InjectRepository(PartnerHero) private readonly partnerHeroRepo: Repository<PartnerHero>,
    private readonly fileUploadService: FileUploadService
  ) {}

  async set(dto: CreatePartnerHeroDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])

    if (!image) {
      throw new NotFoundException("Image not found");
    }

    const existing = await this.get();

    if (!existing) return this.createNewPartnerHero(dto, image[0])
      return this.updateHero(existing, dto, image[0]);
    
  }

  async createNewPartnerHero (dto: CreatePartnerHeroDto, image: FileUpload) {
    const newHero = this.partnerHeroRepo.create({
      title: dto.title,
      description: dto.description,
      image: image[0],
      buttons: dto.buttons,
    });
    await this.partnerHeroRepo.save(newHero);
    return { message: 'Partner Hero created' };

  }

  async updateHero(existing: PartnerHero, dto: CreatePartnerHeroDto, image: FileUpload) {
    Object.assign(existing, { ...dto, image});
    await this.partnerHeroRepo.save(existing);
    return { message: 'Partner Hero updated' };
  }

  async get(): Promise<PartnerHero | null> {
    return await this.partnerHeroRepo.findOne({
      where: {id: Not(IsNull())},
      relations: ['image']
    });
  }

  // Uncomment and implement as needed

  // async findAll() {
  //   return await this.partnerHeroRepo.find();
  // }

  // async findOne(id: number) {
  //   const hero = await this.partnerHeroRepo.findOne({ where: { id } });
  //   if (!hero) throw new NotFoundException(`Partner Hero with ID ${id} not found.`);
  //   return hero;
  // }

  // async remove(id: number) {
  //   const result = await this.partnerHeroRepo.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Partner Hero with ID ${id} not found.`);
  //   }
  //   return { message: 'Partner Hero removed successfully.' };
  // }
}