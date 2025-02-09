import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerBenefitDto } from './dto/create-partner-benefit.dto';
import { UpdatePartnerBenefitDto } from './dto/update-partner-benefit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerBenefit } from './entities/partner-benefit.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class PartnerBenefitsService {
  constructor(
    @InjectRepository(PartnerBenefit) private readonly partnerBenefitRepo: Repository<PartnerBenefit>,
    @InjectRepository(FileUpload) private readonly fileUploadRepo: Repository<FileUpload>
  ) { }
  async create(dto: CreatePartnerBenefitDto) {
    const image = await this.fileUploadRepo.findOne({ where: { id: dto.image } });
    
    if (!image) {
      throw new NotFoundException("Image not found");
    }

    const createNewCard = this.partnerBenefitRepo.create({
      title: dto.title,
      description: dto.description,
      image
    })
    await this.partnerBenefitRepo.save(createNewCard)
    return { message: "Partner Benefit Card is Created " }
  }

  findAll() {
    return this.partnerBenefitRepo.find({relations: ['image']});
  }

  findOne(id: number) {
    return `This action returns a #${id} partnerBenefit`;
  }

  update(id: number, updatePartnerBenefitDto: UpdatePartnerBenefitDto) {
    return `This action updates a #${id} partnerBenefit`;
  }

  remove(id: number) {
    return `This action removes a #${id} partnerBenefit`;
  }
}
