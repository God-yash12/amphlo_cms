import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery) private galleryRepo: Repository<Gallery>,
    private fileUploadService: FileUploadService,
  ) { }

  async create(createGalleryDto: CreateGalleryDto) {
    const files = await this.fileUploadService.getAllByIds(createGalleryDto.galleryIds);

    const gallery = this.galleryRepo.create({
      files: files,
    });

    await this.galleryRepo.save(gallery);

    return { message: 'Gallery created successfully' };
  }

  findAll() {
    return this.galleryRepo.find({
      relations: ['files'],
    });
  }

  

  findOne(id: number) {
    return this.galleryRepo.findOne({
      where: { id },
      relations: ['files'],
    });
  }

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
