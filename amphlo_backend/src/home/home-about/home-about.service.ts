import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeAboutDto } from './dto/create-home-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeAbout } from './entities/home-about.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { dot } from 'node:test/reporters';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class HomeAboutService {
  constructor(
    @InjectRepository(HomeAbout)
    private readonly homeAboutRepository: Repository<HomeAbout>,
    private readonly fileUploadService: FileUploadService,
  ) { }
  async set(dto: CreateHomeAboutDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])
    if (!image) throw new NotFoundException("Home About does not Found")

    const existing = await this.get();

    if (!existing) return await this.createNew(dto, image[0]);

    return await this.update(existing, dto, image[0]);
  }

  async createNew(dto: CreateHomeAboutDto, image: FileUpload) {
    const newHomeAbout = this.homeAboutRepository.create({
      title: dto.title,
      description: dto.description,
      listTitle: dto.listTitle,
      listItem: dto.listItem,
      image: image[0],
    })
    await this.homeAboutRepository.save(newHomeAbout)

    return { message: "Home About Updated successfully" }
  }

  async update(existing: HomeAbout, dto: CreateHomeAboutDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image,
    });

    await this.homeAboutRepository.save(existing);
  }

  async get(): Promise<HomeAbout | null> {
    const homeAbout = await this.homeAboutRepository.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image']
    })
    return homeAbout
  }
}
