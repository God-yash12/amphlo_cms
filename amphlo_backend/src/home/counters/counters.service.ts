import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { Counter } from './entities/counter.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountersService {
  constructor(
    @InjectRepository(Counter)
    private readonly counterRepository: Repository<Counter>,
  ) {}

  async set(dto: CreateCounterDto) {
   
      const existing = await this.get();
      if(!existing) return await this.createNew(dto);

      return await this.updateCounter(existing, dto)
  }

  async createNew(dto: CreateCounterDto){
    const newCounter = this.counterRepository.create({
      title: dto.title,
      description: dto.description,
      countryCount: dto.countryCount,
      countryCountSubTitle: dto.countryCountSubTitle,
      agentCount: dto.agentCount,
      agentCountSubTitle: dto.agentCountSubTitle,
      studentsCount: dto.studentsCount,
      studentsCountSubTitle: dto.studentsCountSubTitle,
      partnerRatingCount: dto.partnerRatingCount,
      partnerRatingSubTitle: dto.partnerRatingSubTitle,
    })
    return await this.counterRepository.save(newCounter)
  }

  async updateCounter(existing: Counter, dto: CreateCounterDto) {
    Object.assign(existing, {
      ...dto
    })
    return await this.counterRepository.save(existing)
  }

  get(): Promise<Counter | null> {
    return this.counterRepository.findOne({
      where: { id: Not(IsNull())}, 
    })
  }
}
