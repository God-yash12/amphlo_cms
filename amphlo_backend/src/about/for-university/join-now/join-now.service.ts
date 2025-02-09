import { Injectable } from '@nestjs/common';
import { CreateJoinNowDto } from './dto/create-join-now.dto';
import { UpdateJoinNowDto } from './dto/update-join-now.dto';
import { JoinNow } from './entities/join-now.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from 'src/home/hero/entities/hero.entity';
import { Repository, Not, IsNull } from 'typeorm';

@Injectable()
export class JoinNowService {
    constructor(
      @InjectRepository(JoinNow) private readonly joinNowRepo: Repository<Hero>
    ){ }
    async set(dto: CreateJoinNowDto) {
        const existing = await this.get();
        if(!existing) return await this.createNewJoinNow(dto);
  
        return await this.updateJoinNow(existing, dto)
    }
  
    async createNewJoinNow(dto: CreateJoinNowDto){
      const newJonNow = this.joinNowRepo.create({
        title: dto.title,
        description: dto.description,
        buttons: dto.buttons,
      })
      return this.joinNowRepo.save(newJonNow)
    }
  
    async updateJoinNow(existing:JoinNow, dto: CreateJoinNowDto){
      Object.assign(existing, {
        ...dto,
      })
      return await this.joinNowRepo.save(existing)
    }
    
  
    get(): Promise<JoinNow | null> {
      return this.joinNowRepo.findOne({
        where: { id: Not(IsNull())}, 
      })
    }

  // findAll() {
  //   return `This action returns all joinNow`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} joinNow`;
  // }

  // update(id: number, updateJoinNowDto: UpdateJoinNowDto) {
  //   return `This action updates a #${id} joinNow`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} joinNow`;
  // }
}
