import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFranceDto } from './dto/create-france.dto';
import { UpdateFranceDto } from './dto/update-france.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { France } from './entities/france.entity';

@Injectable()
export class FranceService {
  constructor(
    @InjectRepository(France) private readonly franceRepository: Repository<France>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}

  async set (dto: CreateFranceDto) {
    const image = await this.fileUploadRepository.findOne({where: {id: dto.image}})
    if(!image) throw new NotFoundException('Image does not exist')
    

      const existing = await this.get()
      if(!existing) return this.createNew(dto, image)

      return this.updateExisting(existing, dto, image)
  }

  async createNew(dto: CreateFranceDto, image: FileUpload) {
    const france = this.franceRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,

    })
    return this.franceRepository.save(france)
  }


  async updateExisting(existing: France, dto: CreateFranceDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,
      image,
    })
    return this.franceRepository.save(existing)
  }
  

  async get() {
      return this.franceRepository.findOne({where: {id: Not(IsNull())}})
  }

  
  // findOne(id: number) {
  //   return `This action returns a #${id} france`;
  // }

  // update(id: number, updateFranceDto: UpdateFranceDto) {
  //   return `This action updates a #${id} france`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} france`;
  // }
}
