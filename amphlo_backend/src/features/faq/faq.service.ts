import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq) private readonly faqRepository: Repository<Faq>
  ) { }
  async create(dto: CreateFaqDto) {
    const createNewFAQ = await this.faqRepository.create({
      question: dto.question,
      answer: dto.answer,
    })
    return await this.faqRepository.save(createNewFAQ)
  }

  findAll() {
    return this.faqRepository.find();
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    const faq = await this.faqRepository.findOne({ where: { id: id } })

    if (!faq) throw new NotFoundException("FAQ does not Found");

    Object.assign(faq, updateFaqDto);

    await this.faqRepository.save(faq)

    return {
      message: "successful FAQ"
    }
  }

  async remove(id: number) {
    const faq = await this.faqRepository.findOne({ where: { id: id } })
    if (!faq) throw new NotFoundException("FAQ does not Found")

    await this.faqRepository.remove(faq)

    return {
      message: "FAQ Deleted successfully"
    }

  }
}
