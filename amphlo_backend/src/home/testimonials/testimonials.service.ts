import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/file-upload/file-upload.service';


@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial) private readonly testimonialsRepository: Repository<Testimonial>,
    private readonly fileUploadService: FileUploadService,
  ) { }
  async create(dto: CreateTestimonialDto) {
    const image = await this.fileUploadService.getAllByIds([dto.imageId])
    if (!image) throw new NotFoundException("Testimonials Image Not Found")

    const newTestimonial = await this.testimonialsRepository.create({
      personName: dto.personName,
      workPlace: dto.workPlace,
      feedback: dto.feedback,
      ratings: dto.ratings,
      createdDate: dto.createdAt,
      image: image[0],
    })
    await this.testimonialsRepository.save(newTestimonial)

    return { newTestimonial, message: "Testimonial Created " }
  }

  async findAll() {
    const testimonials = await this.testimonialsRepository.find({ relations: ['image'] });
    return testimonials
  }

  async update(id: number, dto: UpdateTestimonialDto) {
    const testimonial = await this.testimonialsRepository.findOne({ where: { id }, relations: ['image'] })
    if (!testimonial) throw new NotFoundException("Testimonial does not Found");

    if (dto.imageId) {
      const image = await this.fileUploadService.getAllByIds([dto.imageId])
      testimonial.image = image[0]
    }

    testimonial.personName = dto.personName
    testimonial.workPlace = dto.workPlace
    testimonial.feedback = dto.feedback,
    testimonial.ratings = dto.ratings

    await this.testimonialsRepository.save(testimonial)

    return { testimonial, message: " Testimonial Updated successfully" }
  }

  async remove(id: number) {
    const testimonial = await this.testimonialsRepository.findOne({ where: { id: id } })
    if (!testimonial) throw new NotFoundException("FAQ does not Found")

    await this.testimonialsRepository.remove(testimonial)

    return {
      message: "FAQ Deleted successfully"
    }

  }
}
