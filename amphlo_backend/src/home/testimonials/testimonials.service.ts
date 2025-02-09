import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial) private readonly testimonialsRepository: Repository<Testimonial>,
    @InjectRepository(FileUpload) private readonly fileUploadRepository: Repository<FileUpload>
  ) { }
  async create(dto: CreateTestimonialDto) {
    const image = await this.fileUploadRepository.findOne({ where: { id: dto.image } })
    if (!image) throw new NotFoundException("Testimonials Image Not Found")

    const newTestimonial = await this.testimonialsRepository.create({
      personName: dto.personName,
      workPlace: dto.workPlace,
      feedback: dto.workPlace,
      ratings: dto.ratings,
      createdDate: dto.createdAt,
      image,
    })

    await this.testimonialsRepository.save(newTestimonial)

    return { message: "Testimonial Created " }
  }

  findAll() {
    return this.testimonialsRepository.find({ relations: ['image'] })
  }

  findOne(id: number) {
    return `This action returns a #${id} testimonial`;
  }

  async update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
    const image = await this.testimonialsRepository.findOne({where: {id: updateTestimonialDto.image}})
    if(!image) throw new NotFoundException("Image doesn't Found")
    const testimonial = await this.testimonialsRepository.findOne({where: {id: id}})
    if(!testimonial) throw new NotFoundException("Testimonial does not Found");

    Object.assign(testimonial, image, updateTestimonialDto )
    
    await this.testimonialsRepository.save(testimonial)

    return { message: " Testimonial Updated successfully"}
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
