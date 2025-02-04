import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeyFeatureDto } from './dto/create-key-feature.dto';
import { UpdateKeyFeatureDto } from './dto/update-key-feature.dto';
import { KeyFeature } from './entities/key-feature.entity';
import { Not } from 'typeorm';

@Injectable()
export class KeyFeaturesService {
  constructor(
    @InjectRepository(KeyFeature)
    private readonly keyFeatureRepository: Repository<KeyFeature>,
  ) {}

  async create(createKeyFeatureDto: CreateKeyFeatureDto): Promise<KeyFeature> {
    const existingKeyFeature = await this.keyFeatureRepository.findOne({ where: { title: createKeyFeatureDto.title } });
    if (existingKeyFeature) {
      throw new ConflictException(`KeyFeature with title "${createKeyFeatureDto.title}" already exists`);
    }
    const keyFeature = this.keyFeatureRepository.create(createKeyFeatureDto);
    return this.keyFeatureRepository.save(keyFeature);
  }

  async findAll(): Promise<KeyFeature[]> {
    return this.keyFeatureRepository.find();
  }

  async findOne(id: number): Promise<KeyFeature> {
    const keyFeature = await this.keyFeatureRepository.findOne({ where: { id } });
    if (!keyFeature) {
      throw new NotFoundException(`KeyFeature with ID ${id} not found`);
    }
    return keyFeature;
  }

  async update(id: number, updateKeyFeatureDto: UpdateKeyFeatureDto): Promise<KeyFeature> {
    const keyFeature = await this.findOne(id);
    
    // Check for duplicate title
    const existingKeyFeature = await this.keyFeatureRepository.findOne({ 
      where: { 
        title: updateKeyFeatureDto.title,
        id: Not(id) // Ensure it's not the current keyFeature being updated
      } 
    });
    if (existingKeyFeature) {
      throw new ConflictException(`KeyFeature with title "${updateKeyFeatureDto.title}" already exists`);
    }

    Object.assign(keyFeature, updateKeyFeatureDto);
    return this.keyFeatureRepository.save(keyFeature);
  }

  async remove(id: number): Promise<void> {
    const keyFeature = await this.findOne(id);
    await this.keyFeatureRepository.remove(keyFeature);
  }
}
