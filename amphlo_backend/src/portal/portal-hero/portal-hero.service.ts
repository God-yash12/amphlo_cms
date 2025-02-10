import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortalHeroDto } from './dto/create-portal-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { PortalHero } from './entities/portal-hero.entity';

@Injectable()
export class PortalHeroService {
  constructor(
     @InjectRepository(PortalHero) private readonly portalHeroRepository: Repository<PortalHero>,
     @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>
   ){ }
   async set(dto: CreatePortalHeroDto) {
     const image = await this.fileUploadRepository.findOne({ where: {id: dto.image}})
     if(!image) throw new NotFoundException("Hero Image does not Found")
 
       const existing = await this.get();
       if(!existing) return await this.createNew(dto, image);
 
       return await this.update(existing, dto, image)
   }
 
   async createNew(dto: CreatePortalHeroDto, image: FileUpload){
     const newHero = this.portalHeroRepository.create({
       title: dto.title,
       subTitle: dto.subTitle,
       image,
     })
     return this.portalHeroRepository.save(newHero)
   }
 
   async update(existing:PortalHero, dto: CreatePortalHeroDto, image:FileUpload){
     Object.assign(existing, {       
       ...dto,
       image,
     })
     return await this.portalHeroRepository.save(existing)
   }
   
 
   get(): Promise<PortalHero | null> {
     return this.portalHeroRepository.findOne({
       where: { id: Not(IsNull())}, 
       relations: ['image'],
     })
   }
   

  // findAll() {
  //   return `This action returns all portalHero`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} portalHero`;
  // }

  // update(id: number, updatePortalHeroDto: UpdatePortalHeroDto) {
  //   return `This action updates a #${id} portalHero`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} portalHero`;
  // }
}
