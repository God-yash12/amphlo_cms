import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryHero } from './entities/country.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';



@Module({
  imports: [TypeOrmModule.forFeature([CountryHero, FileUpload])],
  controllers: [CountryController],
  providers: [CountryService],
})




export class CountryModule {}
