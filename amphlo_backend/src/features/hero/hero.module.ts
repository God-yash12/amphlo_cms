import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureHero } from './entities/hero.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureHero]), FileUploadModule],
  controllers: [HeroController],
  providers: [HeroService],
})
export class FeatureHeroModule {}
