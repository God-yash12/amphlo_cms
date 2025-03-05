import { Module } from '@nestjs/common';
import { PartnerHeroService } from './partner-hero.service';
import { PartnerHeroController } from './partner-hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerHero } from './entities/partner-hero.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerHero, FileUpload])],
  controllers: [PartnerHeroController],
  providers: [PartnerHeroService],
})
export class PartnerHeroModule {}
