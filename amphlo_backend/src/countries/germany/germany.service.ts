import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGermanyDto } from './dto/create-germany.dto';
import { UpdateGermanyDto } from './dto/update-germany.dto';
import { IsNull } from 'typeorm';
import { Not } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Germany } from './entities/germany.entity';
import { CreateFranceDto } from '../france/dto/create-france.dto';
import { France } from '../france/entities/france.entity';

@Injectable()
export class GermanyService {
  constructor(
    @InjectRepository(Germany) private readonly germanyRepository: Repository<Germany>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}

  async set (dto: CreateFranceDto) {
    const image = await this.fileUploadRepository.findOne({where: {id: dto.image}})
    if(!image) throw new NotFoundException('Image does not exist')
  
      const existing = await this.get()
      if(!existing) return this.createNew(dto, image)

      return this.updateExisting(existing, dto, image)
  }

  async createNew(dto: CreateGermanyDto, image: FileUpload) {
    const germany = this.germanyRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,


    })
    return this.germanyRepository.save(germany)
  }
  
  async updateExisting(existing: Germany, dto: CreateGermanyDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,
      image,
    })
    return this.germanyRepository.save(existing)
  }


  async get() {
      return this.germanyRepository.findOne({where: {id: Not(IsNull())}})
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} germany`;
  // }

  // update(id: number, updateGermanyDto: UpdateGermanyDto) {
  //   return `This action updates a #${id} germany`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} germany`;
  // }
}
