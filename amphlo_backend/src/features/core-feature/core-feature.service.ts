import { Injectable } from '@nestjs/common';
import { CreateCoreFeatureDto } from './dto/create-core-feature.dto';
import { UpdateCoreFeatureDto } from './dto/update-core-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreFeature } from './entities/core-feature.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class CoreFeatureService {
  constructor(
    @InjectRepository(CoreFeature) private readonly coreFeaturerRepository: Repository<CoreFeature>
  ) { }
  async set(dto: CreateCoreFeatureDto) {
    const existing = await this.get()

    if (!existing) return this.createNewCoreFeature(dto);

    return this.updateCoreFeature(existing, dto)
  }

  async createNewCoreFeature(dto: CreateCoreFeatureDto) {
    const newFeatureData = this.coreFeaturerRepository.create({
      title: dto.title,
      description: dto.description,
      mainTitle: dto.mainTitle
    })
    return await this.coreFeaturerRepository.save(newFeatureData)
  }

  async updateCoreFeature(existing: CoreFeature, dto: CreateCoreFeatureDto) {
    Object.assign(existing, {
      ...dto
    })
    const updatedData = await this.coreFeaturerRepository.save(existing)
    return updatedData
  }

  get(): Promise<CoreFeature> {
    return this.coreFeaturerRepository.findOne({
      where: { id: Not(IsNull()) }
    })
  }

}
