import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureHero } from './entities/hero.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureHero, FileUpload])],
  controllers: [HeroController],
  providers: [HeroService],
})
export class FeatureHeroModule {}
