import { Module } from '@nestjs/common';
import { AustraliaService } from './australia.service';
import { AustraliaController } from './australia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Australia } from './entities/australia.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Australia]), FileUploadModule],
  controllers: [AustraliaController],
  providers: [AustraliaService],
})


export class AustraliaModule {}
