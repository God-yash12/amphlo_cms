import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateAboutMoreDto } from './dto/create-about-more.dto';
import { AboutMore } from './entities/about-more.entity';
import { FileUpload } from '../../file-upload/entities/file-upload.entity'
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class AboutMoreService {
  constructor(
    @InjectRepository(AboutMore)
    private readonly aboutMoreRepository: Repository<AboutMore>,
    private readonly fileUploadService: FileUploadService
  ) {}

  async set(createAboutMoreDto: CreateAboutMoreDto): Promise<AboutMore[]> {
    await this.aboutMoreRepository.clear();
    
    // Map the entries and resolve the image field with FileUpload entity
    const newEntries = this.aboutMoreRepository.create(
      await Promise.all(
        createAboutMoreDto.aboutMore.map(async (dto) => {
          let image = null;
          if (dto.image) {
            const images = await this.fileUploadService.getAllByIds([dto.image]);
            image = images.length > 0 ? images[0] : null;
          }
          return {
            title: dto.title,
            description: dto.description,
            year: dto.year,
            image: image,  
          };
        }),
      ),
    );

    return this.aboutMoreRepository.save(newEntries); 
  }

  async get(): Promise<AboutMore[]> {
    return this.aboutMoreRepository.find({
      where: {id: Not(IsNull())},
      relations: ['image']
    });
  }

  async remove(id: number): Promise<void> {
    const aboutMore = await this.aboutMoreRepository.findOne({ where: { id } });
    if (!aboutMore) {
      throw new NotFoundException(`AboutMore entry with ID ${id} not found`);
    }
    await this.aboutMoreRepository.delete(id);
  }
}
