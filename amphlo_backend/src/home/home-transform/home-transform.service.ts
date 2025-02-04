import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeTransformDto } from './dto/create-home-transform.dto';
import { UpdateHomeTransformDto } from './dto/update-home-transform.dto';
import { HomeTransform } from './entities/home-transform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class HomeTransformService {
  constructor(
    @InjectRepository(HomeTransform)
    private readonly homeTransformRepository: Repository<HomeTransform>,
    @InjectRepository(FileUpload) 
    private readonly fileUploadRepository: Repository<FileUpload>
  ) {}


    async set(dto: CreateHomeTransformDto, file: Express.Multer.File) {
    const image = await this.fileUploadRepository.findOne({where: {id: (dto.image)}})
    if(!image) throw new NotFoundException("Image Not Found")
    
    const existing = await this.get();  
    if(!existing) return await this.createNew(dto, image)

    return this.updateTransform(existing, dto, image) 
  }

  async createNew(dto: CreateHomeTransformDto, image: FileUpload){
    const newHomeTransform = this.homeTransformRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image

    })
    return await this.homeTransformRepository.save(newHomeTransform)

  }
  
  async updateTransform(existing: HomeTransform, dto: CreateHomeTransformDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,
      image
    })
    return await this.homeTransformRepository.save(existing)

  }

  async get(): Promise<HomeTransform | null>{
    return await this.homeTransformRepository.findOne({where: {id: Not(IsNull())}, relations: ['image']})
  }

  findAll() {
    return `This action returns all homeTransform`;
  }


  findOne(id: number) {
    return `This action returns a #${id} homeTransform`;
  }

  update(id: number, updateHomeTransformDto: UpdateHomeTransformDto) {
    return `This action updates a #${id} homeTransform`;
  }

  remove(id: number) {
    return `This action removes a #${id} homeTransform`;
  }
}
