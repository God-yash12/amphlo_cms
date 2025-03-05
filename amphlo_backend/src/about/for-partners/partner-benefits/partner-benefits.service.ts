import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerBenefitDto } from './dto/create-partner-benefit.dto';
import { UpdatePartnerBenefitDto } from './dto/update-partner-benefit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerBenefit } from './entities/partner-benefit.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class PartnerBenefitsService {
  constructor(
    @InjectRepository(PartnerBenefit) private readonly partnerBenefitRepo: Repository<PartnerBenefit>,
    private readonly fileUploadService: FileUploadService
  ) { }
  async create(dto: CreatePartnerBenefitDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])

    if (!image) {
      throw new NotFoundException("Image not found");
    }

    const createNewCard = this.partnerBenefitRepo.create({
      title: dto.title,
      description: dto.description,
      image: image[0],
    })
    await this.partnerBenefitRepo.save(createNewCard)
    return { message: "Partner Benefit Card is Created " }
  }

  findAll() {
    return this.partnerBenefitRepo.find({ relations: ['image'] });
  }

  async removeItem(id: number) {
    const item = await this.partnerBenefitRepo.findOne({ where: { id } })
    if (!item) throw new NotFoundException("Item Not Found")
    await this.partnerBenefitRepo.remove(item)
    return { message: "Item Delete successfully" }
  }

  async updateItem(id: number, updateDto: UpdatePartnerBenefitDto) {
    const item = await this.partnerBenefitRepo.findOne({ where: { id }, relations: ['image'] })
    if (!item) throw new NotFoundException("Item Not Found")
    if (updateDto.image) {
      const image = await this.fileUploadService.getAllByIds([updateDto.image])
      if (!image) {
        throw new NotFoundException("Image Not Found")
      }
      item.image = image[0]
    }

    item.title = updateDto.title;
    item.description = updateDto.description;

    await this.partnerBenefitRepo.save(item)
    return { message: "Item Updated successfully" }
  }

}
