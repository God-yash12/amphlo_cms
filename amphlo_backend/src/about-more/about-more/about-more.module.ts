import { Module } from '@nestjs/common';
import { AboutMoreService } from './about-more.service';
import { AboutMoreController } from './about-more.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { AboutMore } from './entities/about-more.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([AboutMore]), FileUploadModule],
  controllers: [AboutMoreController],
  providers: [AboutMoreService],
})

export class AboutMoreModule {}
