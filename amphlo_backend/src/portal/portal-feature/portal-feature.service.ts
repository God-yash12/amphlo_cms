import { Repository, Not, IsNull } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortalFeatureDto } from './dto/create-portal-feature.dto';
import { UpdatePortalFeatureDto } from './dto/update-portal-feature.dto';
import { PortalFeature } from './entities/portal-feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class PortalFeatureService {
constructor(
    @InjectRepository(PortalFeature)
    private readonly PortalFeatureRepository: Repository<PortalFeature>,
    @InjectRepository(FileUpload)
    private readonly fileUploadRepository: Repository<FileUpload>,
  ) { }
  async set(dto: CreatePortalFeatureDto) {
    const image = await this.fileUploadRepository.findOne({ where: { id: dto.image } })
    if (!image) throw new NotFoundException("Home About does not Found")

    const existing = await this.get();

    if (!existing) return await this.createNew(dto, image);

    return await this.update(existing, dto, image);
  }

  async createNew(dto: CreatePortalFeatureDto, image: FileUpload) {
    const newPortalFeature = this.PortalFeatureRepository.create({
      title: dto.title,
      description: dto.description,
      listTitle: dto.listTitle,
      listItem: dto.listItem,
      image
    })
    await this.PortalFeatureRepository.save(newPortalFeature)

    return { message: "Portal Feature Updated successfully" }
  }

  async update(existing: PortalFeature, dto: CreatePortalFeatureDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image,
    });

    await this.PortalFeatureRepository.save(existing);
  }

  get(): Promise<PortalFeature | null> {
    return this.PortalFeatureRepository.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image']
    })
  }

  // findAll() {
  //   return `This action returns all portalFeature`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} portalFeature`;
  // }

  // update(id: number, updatePortalFeatureDto: UpdatePortalFeatureDto) {
  //   return `This action updates a #${id} portalFeature`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} portalFeature`;
  // }
}
