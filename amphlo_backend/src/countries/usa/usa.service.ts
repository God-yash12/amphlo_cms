import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsaDto } from './dto/create-usa.dto';
import { UpdateUsaDto } from './dto/update-usa.dto';
import { IsNull } from 'typeorm';
import { Not } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USA } from './entities/usa.entity';
import { CreateFranceDto } from '../france/dto/create-france.dto';
import { France } from '../france/entities/france.entity';

@Injectable()
export class UsaService {
  constructor(
    @InjectRepository(USA) private readonly usaRepository: Repository<USA>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}


  async set (dto: CreateUsaDto) {
    const image = await this.fileUploadRepository.findOne({where: {id: dto.image}})
    if(!image) throw new NotFoundException('Image does not exist')
  

      const existing = await this.get()
      if(!existing) return this.createNew(dto, image)

      return this.updateExisting(existing, dto, image)
  }

  async createNew(dto: CreateUsaDto, image: FileUpload) {
    const usa = this.usaRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,

    })
    return this.usaRepository.save(usa)
  }
  
  async updateExisting(existing: USA, dto: CreateUsaDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,
      image,
    })
    return this.usaRepository.save(existing)
  }

  async get() {
      return this.usaRepository.findOne({where: {id: Not(IsNull())}})
  }


  // findAll() {
  //   return `This action returns all usa`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} usa`;
  // }

  // update(id: number, updateUsaDto: UpdateUsaDto) {
  //   return `This action updates a #${id} usa`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} usa`;
  // }
}
