import { Injectable } from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { Journey } from './entities/journey.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JourneyService {
  constructor(
    @InjectRepository(Journey)
    private readonly journeyRepository: Repository<Journey>,
  ) { }

  async set(dto: CreateJourneyDto) {
    const existing = await this.get();
    if (!existing) return await this.journeyRepository.create(dto)

    return this.updateJourney(existing, dto);
  }

  async createNew(dto: CreateJourneyDto) {
    const newJourney = this.journeyRepository.create({
      title: dto.title,
      description: dto.description,
      cardDetail: dto.cardDetail,
    });
    return this.journeyRepository.save(newJourney)
  }

  async updateJourney(existing: Journey, dto: CreateJourneyDto) {
    Object.assign(existing, {
      ...dto,
      cardDetail: dto.cardDetail
    })
    const journeyData = await this.journeyRepository.save(existing)
    return journeyData;
  }

  async get() {
    return await this.journeyRepository.findOne({ where: { id: Not(IsNull()) } });
  }
}
