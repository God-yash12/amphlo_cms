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
  ) {}

  async set(dto: CreateJourneyDto) {
    const existing = await this.get();
    if(!existing) {
      const newJourney = this.journeyRepository.create({
        title: dto.title,

        description: dto.description,
        cardDetail: dto.cardDetail,
      });
      return this.journeyRepository.save(newJourney)
    }

    return this.updateJourney(existing, dto);
  }

  async updateJourney(existing: Journey, dto: CreateJourneyDto) {
    Object.assign(existing, {
      ...dto,
    })
    return await this.journeyRepository.save(existing)
  }

  async get() {
    return await this.journeyRepository.findOne({where: {id: Not(IsNull())}});
  }

  // findAll() {
  //   return `This action returns all journey`;
  // }


  // findOne(id: number) {
  //   return `This action returns a #${id} journey`;
  // }

  // update(id: number, updateJourneyDto: UpdateJourneyDto) {
  //   return `This action updates a #${id} journey`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} journey`;
  // }
}
