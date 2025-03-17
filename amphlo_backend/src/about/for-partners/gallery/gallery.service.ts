import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery) private galleryRepo: Repository<Gallery>,
    @InjectRepository(FileUpload) private fileUploadRepo: Repository<FileUpload>,
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

  async removeImage(galleryId: number, fileId: number) {
    // Step 1: Find the gallery with its images
    const gallery = await this.galleryRepo.findOne({
      where: { id: galleryId },
      relations: ['files'],
    });
  
    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }
  
    // Step 2: Find the file in the gallery
    const file = gallery.files.find(file => file.id === fileId);
    if (!file) {
      throw new NotFoundException('Image not found in the gallery');
    }
  
    // Step 3: Remove the file reference from the gallery
    gallery.files = gallery.files.filter(f => f.id !== fileId);
    await this.galleryRepo.save(gallery); 
    await this.deleteFile(fileId);
  
    return { message: 'Image removed from gallery successfully' };
  }
  
  async deleteFile(fileId: number) {
    const file = await this.fileUploadRepo.findOne({ where: { id: fileId } });
  
    if (!file) {
      throw new NotFoundException('File not found');
    }
    // Step 2: Remove from the database
    await this.fileUploadRepo.remove(file);
  
    return { message: 'File deleted successfully' };
  }

  
}
