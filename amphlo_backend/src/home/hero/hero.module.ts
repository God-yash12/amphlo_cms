import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { Hero } from './entities/hero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero]), FileUploadModule],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
