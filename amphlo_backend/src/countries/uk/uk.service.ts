import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUkDto } from './dto/create-uk.dto';
import { UpdateUkDto } from './dto/update-uk.dto';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UK } from './entities/uk.entity';
import { CreateFranceDto } from '../france/dto/create-france.dto';
import { Not, IsNull } from 'typeorm';

@Injectable()
export class UkService {
  constructor(
    @InjectRepository(UK) private readonly ukRepository: Repository<UK>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}

  async set (dto: CreateUkDto) {
    const image = await this.fileUploadRepository.findOne({where: {id: dto.image}})
    if(!image) throw new NotFoundException('Image does not exist')

      const existing = await this.get()
      if(!existing) return this.createNew(dto, image)

      return this.updateExisting(existing, dto, image)
  }

  async createNew(dto: CreateUkDto, image: FileUpload) {
    const uk = this.ukRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,


    })
    return this.ukRepository.save(uk)
  }



  async updateExisting(existing: UK, dto: CreateUkDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,

      image,
    })
    return this.ukRepository.save(existing)
  }
  


  async get() {
      return this.ukRepository.findOne({where: {id: Not(IsNull())}})
  }



  // findAll() {
  //   return `This action returns all uk`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} uk`;
  // }

  // update(id: number, updateUkDto: UpdateUkDto) {
  //   return `This action updates a #${id} uk`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} uk`;
  // }
}
