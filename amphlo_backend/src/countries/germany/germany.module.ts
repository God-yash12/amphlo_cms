import { Module } from '@nestjs/common';
import { GermanyService } from './germany.service';
import { GermanyController } from './germany.controller';
import { Germany } from './entities/germany.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Germany]), FileUploadModule],
  controllers: [GermanyController],
  providers: [GermanyService],
})

export class GermanyModule {}
