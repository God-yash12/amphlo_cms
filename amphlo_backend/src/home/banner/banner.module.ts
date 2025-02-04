import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { Banner } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/file-upload/file-upload.module';


@Module({
  imports: [TypeOrmModule.forFeature([Banner]), FileUploadModule],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
