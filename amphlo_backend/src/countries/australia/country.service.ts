import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAustraliaDto } from './dto/create-country.dto';
import { UpdateAustraliaDto } from './dto/update-country.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { CountryHero } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryHero)
    private readonly countryHeroRepository: Repository<CountryHero>,
    private readonly fileUploadService: FileUploadService
  ) { }


  async create(dto: CreateAustraliaDto) {
    const countryName = await this.countryHeroRepository.findOne({ where: { countryName: dto.countryName } })
    if (countryName) throw new NotFoundException('Country Already exists')

      let image = null;
      if (dto.image) {
        image = await this.fileUploadService.getAllByIds([dto.image]);
        if (!image) throw new NotFoundException('Image not found');
      } 

    const newCountry = await this.countryHeroRepository.create({
      countryName: dto.countryName,
      title: dto.title,
      description: dto.description,
      buttons: dto.buttons,
      image: image[0],
    })
    return this.countryHeroRepository.save(newCountry)
  }

    findAll() {
    return this.countryHeroRepository.find({relations: ['image']});
  }

}
