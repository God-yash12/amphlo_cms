import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWhyamphloCardDto } from './dto/create-whyamphlo-card.dto';
import { UpdateWhyamphloCardDto } from './dto/update-whyamphlo-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WhyamphloCard } from './entities/whyamphlo-card.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class WhyamphloCardService {
  constructor(
    @InjectRepository(WhyamphloCard) private readonly cardRepo: Repository<WhyamphloCard>,
    @InjectRepository(FileUpload) private readonly fileUploadRepo: Repository<FileUpload>
  ) { }
  async create(dto: CreateWhyamphloCardDto) {
    const image = await this.fileUploadRepo.findOne({ where: { id: dto.image } })
    if (!image) {
      throw new NotFoundException("Card image not Found")
    }

    const newCard = this.cardRepo.create({
      title: dto.title,
      description: dto.description,
      image,
    })
     await  this.cardRepo.save(newCard)
    return { message: "Why Card of For University is Created", card: newCard }
  }

  async findAll() {
    const cards = await this.cardRepo.find({relations: ['image']});
    return {data: cards}
  }

  findOne(id: number) {
    return `This action returns a #${id} whyamphloCard`;
  }

  update(id: number, updateWhyamphloCardDto: UpdateWhyamphloCardDto) {
    return `This action updates a #${id} whyamphloCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} whyamphloCard`;
  }
}
