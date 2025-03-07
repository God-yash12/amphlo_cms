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
    private readonly fileUploadService: FileUploadService,
  ) {}


    async set(dto: CreateHomeTransformDto, file: Express.Multer.File) {
      let image = null;
      if (dto.imageId) {
        image = await this.fileUploadService.getAllByIds([dto.imageId]);
      }
    
    const existing = await this.get();  
    if(!existing) return await this.createNew(dto, image ? image[0] : null)

      return this.updateTransform(existing, dto, image ? image[0] : null) 
  }

  async createNew(dto: CreateHomeTransformDto, image: FileUpload){
    const newHomeTransform = this.homeTransformRepository.create({
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image: image,

    })
    return await this.homeTransformRepository.save(newHomeTransform)

  }
  
  async updateTransform(existing: HomeTransform, dto: CreateHomeTransformDto, image: FileUpload){
    Object.assign(existing, {
      ...dto,
      image: image,
    })
    return await this.homeTransformRepository.save(existing)

  }

  async get(): Promise<HomeTransform | null>{
    const homeTransform = await this.homeTransformRepository.findOne({where: {id: Not(IsNull())}, relations: ['image']})
    if(!homeTransform) return null
    return homeTransform
  }

}
