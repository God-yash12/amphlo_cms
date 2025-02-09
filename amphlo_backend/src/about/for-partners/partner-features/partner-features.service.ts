import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerFeatureDto } from './dto/create-partner-feature.dto';
import { UpdatePartnerFeatureDto } from './dto/update-partner-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerFeature } from './entities/partner-feature.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class PartnerFeaturesService {
  constructor(
    @InjectRepository(PartnerFeature) private readonly partnerFeatureRepo: Repository<PartnerFeature>,
    @InjectRepository(FileUpload) private readonly fileUploadRepo: Repository<FileUpload>
  ) { }
  async set(dto: CreatePartnerFeatureDto) {
    const image = await this.fileUploadRepo.findOne({ where: { id: dto.image } })
    if (!image) throw new NotFoundException('Image Not Found')

    const existing = await this.get();

    if (!existing) return this.createNew(dto, image)

    return this.updateFeature(existing, dto, image)
  }

  async createNew(dto: CreatePartnerFeatureDto, image: FileUpload) {
    const newFeature = await this.partnerFeatureRepo.create({
      featureTitle: dto.featureTitle,
      featureDescription: dto.featureDescription,
      image,
      feature: dto.feature,
    })
    await this.partnerFeatureRepo.save(newFeature)
    return { message: "Partner Feature Created" }
  }

  async updateFeature(existing: PartnerFeature, dto: CreatePartnerFeatureDto, image: FileUpload) {
    Object.assign(existing, {
      ...dto,
      image,
    })
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
