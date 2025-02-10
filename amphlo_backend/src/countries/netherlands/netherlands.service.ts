import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNetherlandsDto } from './dto/create-netherland.dto';
// import { UpdateNetherlandsDto } from './dto/update-netherland.dto';
import { Netherlands } from './entities/netherland.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateAustraliaDto } from '../australia/dto/create-australia.dto';


@Injectable()
export class NetherlandsService {
  constructor(
    @InjectRepository(Netherlands)
    private readonly netherlandsRepository: Repository<Netherlands>,
    @InjectRepository(FileUpload)
    private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}

  async set (dto: CreateNetherlandsDto) {
    const image = await this.fileUploadRepository.findOne({where: {id: dto.image}})
    if(!image) throw new NotFoundException('Image does not exist')
    

      const existing = await this.get()
      if(!existing) return this.createNew(dto, image)

      return this.updateExisting(existing, dto, image)
  }

  async createNew(dto: CreateNetherlandsDto, image: FileUpload) {
    const netherlands = this.netherlandsRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,

    })
    return this.netherlandsRepository.save(netherlands)
  }


  async updateExisting(existing: Netherlands, dto: CreateNetherlandsDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,
      image,
    })
    return this.netherlandsRepository.save(existing)
  }

  
  async get() {
    return this.netherlandsRepository.findOne({where: {id: Not(IsNull())}})
  }



  // findAll() {
  //   return `This action returns all netherlands`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} netherland`;
  // }

  // update(id: number, updateNetherlandDto: UpdateNetherlandDto) {
  //   return `This action updates a #${id} netherland`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} netherland`;
  // }
}
