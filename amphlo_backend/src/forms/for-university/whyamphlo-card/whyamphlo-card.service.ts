import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWhyamphloCardDto } from './dto/create-whyamphlo-card.dto';
import { UpdateWhyamphloCardDto } from './dto/update-whyamphlo-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WhyamphloCard } from './entities/whyamphlo-card.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class WhyamphloCardService {
  constructor(
    @InjectRepository(WhyamphloCard) private readonly cardRepo: Repository<WhyamphloCard>,
    private readonly fileUploadService: FileUploadService,
  ) { }
  async create(dto: CreateWhyamphloCardDto) {
    const image = await this.fileUploadService.getAllByIds([dto.image])

    const newCard = this.cardRepo.create({
      title: dto.title,
      description: dto.description,
      image: image[0],
    })
    await this.cardRepo.save(newCard)
    return { message: "Why Card of For University is Created", card: newCard }
  }

  async findAll() {
    const cards = await this.cardRepo.find({ relations: ['image'] });
    return { data: cards }
  }

  findOne(id: number) {
    return `This action returns a #${id} whyamphloCard`;
  }

  async update(id: number, dto: UpdateWhyamphloCardDto) {
    const amphloCard = await this.cardRepo.findOne({ where: { id }, relations: ['image'] })
    if (!amphloCard) throw new NotFoundException('data doesnot Found')

    if (dto.image) {
      const image = await this.fileUploadService.getAllByIds([dto.image])

      if (!image) {
        throw new NotFoundException('Image doesnot Found')
      }
      amphloCard.image = image[0]
    }

    amphloCard.title = dto.title || amphloCard.title;
    amphloCard.description = dto.description || amphloCard.description

    return await this.cardRepo.save(amphloCard)
  }

  async remove(id: number) {
    const card = await this.cardRepo.findOne({ where: { id }, relations: ['image'] })
    if (!card) {
      throw new NotFoundException('Data doesnot Found')
    }
    return await this.cardRepo.delete(card)
  }
}
