import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerFeatureDto } from './dto/create-partner-feature.dto';
import { UpdatePartnerFeatureDto } from './dto/update-partner-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerFeature } from './entities/partner-feature.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class PartnerFeaturesService {
  constructor(
    @InjectRepository(PartnerFeature) private readonly partnerFeatureRepo: Repository<PartnerFeature>,
    private readonly fileUploadService: FileUploadService
  ) { }
  async set(dto: CreatePartnerFeatureDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])
    if (!image) throw new NotFoundException('Image Not Found')

    const existing = await this.get();

    if (!existing) return this.createNew(dto, image[0])

    return this.updateFeature(existing, dto, image[0])
  }

  async createNew(dto: CreatePartnerFeatureDto, image: FileUpload) {
    const newFeature =  this.partnerFeatureRepo.create({
      featureTitle: dto.featureTitle,
      featureDescription: dto.featureDescription,
      feature: dto.feature,
      image: image[0],
    })
    await this.partnerFeatureRepo.save(newFeature)
    return { message: "Partner Feature Created" }
  }

  async updateFeature(existing: PartnerFeature, dto: CreatePartnerFeatureDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image,
    })
    return await this.partnerFeatureRepo.save(existing)
  }

  get() {
    return this.partnerFeatureRepo.findOne({
      where: { id: Not(IsNull()) },
      relations: ['image']
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} partnerFeature`;
  }

  update(id: number, updatePartnerFeatureDto: UpdatePartnerFeatureDto) {
    return `This action updates a #${id} partnerFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} partnerFeature`;
  }
}
