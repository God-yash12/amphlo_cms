import { Repository, Not, IsNull } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortalFeatureDto } from './dto/create-portal-feature.dto';
import { PortalFeature } from './entities/portal-feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class PortalFeatureService {
constructor(
    @InjectRepository(PortalFeature)
    private readonly PortalFeatureRepository: Repository<PortalFeature>,
    private readonly fileUploadService: FileUploadService,
  ) { }
  async set(dto: CreatePortalFeatureDto) {
    const image = await this.fileUploadService.getAllByIds([dto.imageId])
    if (!image) throw new NotFoundException("Home About does not Found")

    const existing = await this.get();

    if (!existing) return await this.createNew(dto, image[0]);

    return await this.update(existing, dto, image[0]);
  }

  async createNew(dto: CreatePortalFeatureDto, image: FileUpload) {
    const newPortalFeature = this.PortalFeatureRepository.create({
      title: dto.title,
      mainTitle: dto.mainTitle,
      description: dto.description,
      listTitle: dto.listTitle,
      listItem: dto.listItem,
      image,
    })
    await this.PortalFeatureRepository.save(newPortalFeature)

    return { message: "Portal Feature Updated successfully" }
  }

  async update(existing: PortalFeature, dto: CreatePortalFeatureDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image: image[0]
    });

    await this.PortalFeatureRepository.save(existing);
    return { message: "Portal Features Updated "}
  }

  get(): Promise<PortalFeature | null> {
    return this.PortalFeatureRepository.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image']
    })
  }

}
