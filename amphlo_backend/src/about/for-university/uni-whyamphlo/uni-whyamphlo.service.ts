import { Injectable } from '@nestjs/common';
import { CreateUniWhyamphloDto } from './dto/create-uni-whyamphlo.dto';
import { UpdateUniWhyamphloDto } from './dto/update-uni-whyamphlo.dto';
import { UniWhyamphlo } from './entities/uni-whyamphlo.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UniWhyamphloService {
  constructor(
    @InjectRepository(UniWhyamphlo)
    private readonly uniWhyamphloRepository: Repository<UniWhyamphlo>,
  ) {}

  async set(dto: CreateUniWhyamphloDto) {
    const existing = await this.get();
    if(!existing) return await this.createNew(dto);

    return await this.update(existing, dto);

  }

  createNew(dto: CreateUniWhyamphloDto) {
    const newUniWhyamphlo = this.uniWhyamphloRepository.create({
      title: dto.title,
      description: dto.description,
    });
    return this.uniWhyamphloRepository.save(newUniWhyamphlo);
  }

  update(existing: UniWhyamphlo, dto: CreateUniWhyamphloDto) {
    Object.assign(existing, dto);
    return this.uniWhyamphloRepository.save(existing);
  }

  get() {
    return this.uniWhyamphloRepository.findOne({
      where: { id: Not(IsNull())}, 
    });
  }


  // findAll() {
  //   return `This action returns all uniWhyamphlo`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} uniWhyamphlo`;
  // }

  // update(id: number, updateUniWhyamphloDto: UpdateUniWhyamphloDto) {
  //   return `This action updates a #${id} uniWhyamphlo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} uniWhyamphlo`;
  // }
}
