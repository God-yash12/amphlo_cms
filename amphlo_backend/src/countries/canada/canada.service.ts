import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCanadaDto } from './dto/create-canada.dto';
import { UpdateCanadaDto } from './dto/update-canada.dto';
import { IsNull } from 'typeorm';
import { Not } from 'typeorm';
import { Canada } from './entities/canada.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CanadaService {
  constructor(

    @InjectRepository(Canada)
    private readonly canadaRepository: Repository<Canada>,
    @InjectRepository(FileUpload)
    private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}
  
  async set (dto: CreateCanadaDto) {
    const image = await this.fileUploadRepository.findOne({where: {id: dto.image}})

    if(!image) throw new NotFoundException('Image does not exist')
    
      const existing = await this.get()
      if(!existing) return this.createNew(dto, image)

      return this.updateExisting(existing, dto, image)
  }

  async createNew(dto: CreateCanadaDto, image: FileUpload) {
    const canada = this.canadaRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,

    })
    return this.canadaRepository.save(canada)
  }


  async updateExisting(existing: Canada, dto: CreateCanadaDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,

      image,
    })
    return this.canadaRepository.save(existing)
  }
  

  async get() {
    return this.canadaRepository.findOne({where: {id: Not(IsNull())}})
  }


  // findAll() {
  //   return `This action returns all canada`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} canada`;
  // }

  // update(id: number, updateCanadaDto: UpdateCanadaDto) {
  //   return `This action updates a #${id} canada`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} canada`;
  // }
}
