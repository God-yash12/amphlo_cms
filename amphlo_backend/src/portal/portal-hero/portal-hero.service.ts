import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortalHeroDto } from './dto/create-portal-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { PortalHero } from './entities/portal-hero.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class PortalHeroService {
  constructor(
    @InjectRepository(PortalHero) private readonly portalHeroRepository: Repository<PortalHero>,
    private readonly fileUploadService: FileUploadService,
  ) { }
  async set(dto: CreatePortalHeroDto) {

    const image = dto.imageId ? await this.fileUploadService.getAllByIds([dto.imageId]) : null

    const existing = await this.get();
    if (!existing) return await this.createNew(dto, image ? image[0] : null);

    return await this.update(existing, dto, image ? image[0] : null)
  }

  async createNew(dto: CreatePortalHeroDto, image: FileUpload) {
    const newHero = this.portalHeroRepository.create({
      title: dto.title,
      subTitle: dto.subTitle,
      image: image,
    })
    return this.portalHeroRepository.save(newHero)
  }

  async update(existing: PortalHero, dto: CreatePortalHeroDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image: image
    })
    return await this.portalHeroRepository.save(existing)
  }


  get(): Promise<PortalHero | null> {
    return this.portalHeroRepository.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image'],
    })
  }

}
