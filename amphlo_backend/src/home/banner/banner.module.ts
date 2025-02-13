import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { Banner } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Banner, FileUpload])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
