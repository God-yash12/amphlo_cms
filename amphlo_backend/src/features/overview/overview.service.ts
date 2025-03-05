import { Inject, Injectable } from '@nestjs/common';
import { CreateOverviewDto } from './dto/create-overview.dto';
import { UpdateOverviewDto } from './dto/update-overview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';
import { In, Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(Overview) private readonly overviewRepository: Repository<Overview>,
    private readonly fileUploadService: FileUploadService
  ) { }

  async create(dto: CreateOverviewDto) {
    const overviewData = await Promise.all(
      dto.overview.map(async item => {
        const image = await this.fileUploadService.getAllByIds([item.image])
        if (!image) {
          throw new Error(`Image with ID ${item.image} not found`);
        }
        return {
          title: item.title,
          description: item.description,
          images: [image[0]],
        };
      })
    );

    const newOverviews = this.overviewRepository.create(overviewData);
    return await this.overviewRepository.save(newOverviews);
  }



  findAll() {
    return this.overviewRepository.find({relations: ['images']});
  }

  findOne(id: number) {
    return `This action returns a #${id} overview`;
  }

  update(id: number, updateOverviewDto: UpdateOverviewDto) {
    return `This action updates a #${id} overview`;
  }

  remove(id: number) {
    return `This action removes a #${id} overview`;
  }
}
