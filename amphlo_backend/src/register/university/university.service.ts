import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from './entities/university.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University) private readonly universityRepository: Repository<University>
  ) { }

  // Create a new university
  async create(createUniversityDto: CreateUniversityDto) {
    const checkEmail = await this.universityRepository.findOne({ where: { email: createUniversityDto.email } });
    if (checkEmail) {
      throw new ConflictException(`University with this email already exists!`);
    }
    const newUniversity = this.universityRepository.create(createUniversityDto);
     this.universityRepository.save(newUniversity);
     return { message: "University register successful"}
  }

  // Get all universities
  async findAll() {
    const universities = await this.universityRepository.find();
    return universities;
  }

  // // Get a university by ID
  // async findOne(id: number) {
  //   const university = await this.universityRepository.findOne(id);
  //   if (!university) {
  //     throw new NotFoundException(`University with ID ${id} not found.`);
  //   }
  //   return university;
  // }

  // // Update a university by ID
  // async update(id: number, updateUniversityDto: UpdateUniversityDto) {
  //   const university = await this.universityRepository.findOne();
  //   if (!university) {
  //     throw new NotFoundException(`University with ID ${id} not found.`);
  //   }
  //   Object.assign(university, updateUniversityDto);
  //   return this.universityRepository.save(university);
  // }

  // Delete a university by ID
  async remove(id: number) {
    const deleteResult = await this.universityRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`University with ID ${id} not found.`);
    }
  }
}
