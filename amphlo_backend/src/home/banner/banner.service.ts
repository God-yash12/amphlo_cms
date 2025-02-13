import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class BannerService {

  constructor(
    @InjectRepository(Banner) private readonly bannerRepository: Repository<Banner>,
    private readonly fileUploadService: FileUploadService,
  ) { }
  async set(createBannerDto: CreateBannerDto) {
    const image = await this.fileUploadService.getAllByIds([createBannerDto.imageId])
    if (!image) throw new NotFoundException("Banner Image Not Found")

    const existing = await this.get();
    if (!existing) return await this.createNew(createBannerDto, image[0])

    return await this.updateBanner(existing, createBannerDto, image[0])
  }

  async createNew(dto: CreateBannerDto, image: FileUpload) {
    const newBanner = this.bannerRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image: image[0]
    })
    return await this.bannerRepository.save(newBanner)
  }

  async updateBanner(existing: Banner, dto: CreateBannerDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image
    })
    return await this.bannerRepository.save(existing)
  }

  get(): Promise<Banner | null> {
    return this.bannerRepository.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image']
    })
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
