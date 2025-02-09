import { Injectable } from '@nestjs/common';
import { CreateUniFeatureDto } from './dto/create-uni-feature.dto';
import { UpdateUniFeatureDto } from './dto/update-uni-feature.dto';
import { UniFeature } from './entities/uni-feature.entity';
import { Repository, IsNull, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UniFeatureService {
  constructor(
    @InjectRepository(UniFeature)

    private readonly uniFeatureRepository: Repository<UniFeature>,
  ) {}

  async set(createUniFeatureDto: CreateUniFeatureDto) {
    const existing = await this.get();
    if(!existing) {
      const newUniFeature = this.uniFeatureRepository.create({

        title: createUniFeatureDto.title,
        description: createUniFeatureDto.description,
      });
      return this.uniFeatureRepository.save(newUniFeature);
    }

    return await this.updateFeature( existing, createUniFeatureDto);
  }

  async updateFeature(existing: UniFeature, dto: CreateUniFeatureDto) {
    Object.assign(existing, {
      ...dto,
    })
    return await this.uniFeatureRepository.save(existing)
  }

  async get() {
    return await this.uniFeatureRepository.findOne({where: {id: Not(IsNull())}});
  }

  // findAll() {
  //   return `This action returns all uniFeature`;
  // }


  // findOne(id: number) {
  //   return `This action returns a #${id} uniFeature`;
  // }

  // update(id: number, updateUniFeatureDto: UpdateUniFeatureDto) {
  //   return `This action updates a #${id} uniFeature`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} uniFeature`;
  // }
}
