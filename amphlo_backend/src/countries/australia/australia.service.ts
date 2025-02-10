import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAustraliaDto } from './dto/create-australia.dto';
import { UpdateAustraliaDto } from './dto/update-australia.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { Australia } from './entities/australia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
@Injectable()
export class AustraliaService {
  constructor(
    @InjectRepository(Australia)
    private readonly australiaRepository: Repository<Australia>,
    @InjectRepository(FileUpload)
    private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}


  async set (dto: CreateAustraliaDto) {
    const image = await this.fileUploadRepository.findOne({where: {id: dto.image}})
    if(!image) throw new NotFoundException('Image does not exist')
    
      const existing = await this.get()
      if(!existing) return this.createNew(dto, image)

      return this.updateExisting(existing, dto, image)
  }

  async createNew(dto: CreateAustraliaDto, image: FileUpload) {
    const australia = this.australiaRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image,
    })
    return this.australiaRepository.save(australia)
  }

  async updateExisting(existing: Australia, dto: CreateAustraliaDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,
      image,
    })
    return this.australiaRepository.save(existing)
  }
  
  async get() {
    return this.australiaRepository.findOne({where: {id: Not(IsNull())}})
  }

  //   findAll() {
  //   return `This action returns all australia`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} australia`;
  // }

  // update(id: number, updateAustraliaDto: UpdateAustraliaDto) {
  //   return `This action updates a #${id} australia`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} australia`;
  // }
}
