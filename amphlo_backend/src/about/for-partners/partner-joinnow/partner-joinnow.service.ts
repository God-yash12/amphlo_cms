import { Injectable } from '@nestjs/common';
import { CreatePartnerJoinnowDto } from './dto/create-partner-joinnow.dto';
import { UpdatePartnerJoinnowDto } from './dto/update-partner-joinnow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerJoinnow } from './entities/partner-joinnow.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class PartnerJoinnowService {
  constructor(
    @InjectRepository(PartnerJoinnow) private readonly joinNowRepo: Repository<PartnerJoinnow>
  ) { }
  async set(dto: CreatePartnerJoinnowDto) {
    const existing = await this.get();

    if (!existing) return await this.createNewJoinNow(dto)

    return await this.UpdateJoinNow(existing, dto)
  }

  async createNewJoinNow(dto: CreatePartnerJoinnowDto) {
    const newJoinNow = this.joinNowRepo.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
    })
    await this.joinNowRepo.save(newJoinNow)
    return { message: "Partner Join Now Updated successfully" }
  }

  async UpdateJoinNow(existing: PartnerJoinnow, dto: CreatePartnerJoinnowDto) {
    Object.assign({
      ...dto
    })
    return await this.joinNowRepo.save(existing)
  }

  async get() {
    return this.joinNowRepo.findOne({ where: { id: Not(IsNull()) } })
  }

  // findAll() {
  //   return `This action returns all partnerJoinnow`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} partnerJoinnow`;
  // }

  // update(id: number, updatePartnerJoinnowDto: UpdatePartnerJoinnowDto) {
  //   return `This action updates a #${id} partnerJoinnow`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} partnerJoinnow`;
  // }
}
