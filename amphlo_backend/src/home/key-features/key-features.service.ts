import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateKeyFeatureDto } from './dto/create-key-feature.dto';
import { UpdateKeyFeatureDto } from './dto/update-key-feature.dto';
import { KeyFeature } from './entities/key-feature.entity';


@Injectable()
export class KeyFeaturesService {
  constructor(
    @InjectRepository(KeyFeature)
    private readonly keyFeatureRepository: Repository<KeyFeature>,
  ) {}

  async set(dto: CreateKeyFeatureDto): Promise<KeyFeature> {
    const existing = await this.get()
    if (!existing) {
      return await this.createNewKeyFeature(dto);
    }
    return await this.updateKeyFeature(existing, dto);
  }

  createNewKeyFeature(dto: CreateKeyFeatureDto) {
    const newFeature = this.keyFeatureRepository.create({
      title: dto.title,
      description: dto.description,
    });
    return this.keyFeatureRepository.save(newFeature);
  }

  async updateKeyFeature(existing: KeyFeature, dto: CreateKeyFeatureDto) {
    Object.assign(existing, {
      ...dto,
    });
    return this.keyFeatureRepository.save(existing);
  }

  get() {
    return this.keyFeatureRepository.findOne({
      where: {id: Not(IsNull())}
    });
  }
}

  
  // async findAll() {
  //   return this.keyFeatureRepository.find();
  // }

  // async findOne(id: number): Promise<KeyFeature> {
  //   const keyFeature = await this.keyFeatureRepository.findOne({ where: { id } });
  //   if (!keyFeature) {
  //     throw new NotFoundException(`KeyFeature with ID ${id} not found`);
  //   }
  //   return keyFeature;
  // }

  // async update(id: number, updateKeyFeatureDto: UpdateKeyFeatureDto): Promise<KeyFeature> {
  //   const keyFeature = await this.findOne(id);
    
  //   // Check for duplicate title
  //   const existingKeyFeature = await this.keyFeatureRepository.findOne({ 
  //     where: { 
  //       title: updateKeyFeatureDto.title,
  //       id: Not(id) // Ensure it's not the current keyFeature being updated
  //     } 
  //   });
  //   if (existingKeyFeature) {
  //     throw new ConflictException(`KeyFeature with title "${updateKeyFeatureDto.title}" already exists`);
  //   }

  //   Object.assign(keyFeature, updateKeyFeatureDto);
  //   return this.keyFeatureRepository.save(keyFeature);
  // }

  // async remove(id: number): Promise<void> {
  //   const keyFeature = await this.findOne(id);
  //   await this.keyFeatureRepository.remove(keyFeature);
  // }

