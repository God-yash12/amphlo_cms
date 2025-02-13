import { Module } from '@nestjs/common';
import { HomeAboutService } from './home-about.service';
import { HomeAboutController } from './home-about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeAbout } from './entities/home-about.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeAbout, FileUpload])],
  providers: [HomeAboutService],
  controllers: [HomeAboutController],
})
export class HomeAboutModule {}
