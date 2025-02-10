import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJapanDto } from './dto/create-japan.dto';
import { UpdateJapanDto } from './dto/update-japan.dto';
import { IsNull } from 'typeorm';
import { Not } from 'typeorm';
import { Japan } from './entities/japan.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFranceDto } from '../france/dto/create-france.dto';
import { France } from '../france/entities/france.entity';

@Injectable()
export class JapanService {
  constructor(
    @InjectRepository(Japan) private readonly japanRepository: Repository<Japan>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}



  async set (dto: CreateFranceDto) {
    const image = await this.fileUploadRepository.findOne({where: {id: dto.image}})
    if(!image) throw new NotFoundException('Image does not exist')
    

      const existing = await this.get()
      if(!existing) return this.createNew(dto, image)

      return this.updateExisting(existing, dto, image)
  }

  async createNew(dto: CreateJapanDto, image: FileUpload) {
    const japan = this.japanRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,

    })
    return this.japanRepository.save(japan)
  }

  async updateExisting(existing: Japan, dto: CreateJapanDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,
      image,
    })
    return this.japanRepository.save(existing)
  }

  async get() {
      return this.japanRepository.findOne({where: {id: Not(IsNull())}})
  }


  // findAll() {
  //   return `This action returns all japan`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} japan`;
  // }

  // update(id: number, updateJapanDto: UpdateJapanDto) {
  //   return `This action updates a #${id} japan`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} japan`;
  // }
}
