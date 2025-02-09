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
  ){ }
  async set(dto: CreateCoreFeatureDto) {
    const existing = await this.get()

    if(!existing) return this.createNewCoreFeature(dto);

    return this.updateCoreFeature(existing, dto)
  }

  createNewCoreFeature(dto: CreateCoreFeatureDto){
    const newFeatureData = this.coreFeaturerRepository.create({
      title: dto.title,
      description: dto.description,
      mainTitle: dto.mainTitle
    })
    return this.coreFeaturerRepository.save(newFeatureData)
  }

  updateCoreFeature(existing:CoreFeature, dto: CreateCoreFeatureDto){
    Object.assign({
      ...dto
    })
  }

  get(): Promise<CoreFeature>{
    return this.coreFeaturerRepository.findOne({
      where: {id: Not(IsNull())}
    })
  }


  findAll() {
    return `This action returns all coreFeature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coreFeature`;
  }

  update(id: number, updateCoreFeatureDto: UpdateCoreFeatureDto) {
    return `This action updates a #${id} coreFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} coreFeature`;
  }
}
