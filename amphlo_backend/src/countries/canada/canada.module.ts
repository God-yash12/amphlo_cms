import { Module } from '@nestjs/common';
import { CanadaService } from './canada.service';
import { CanadaController } from './canada.controller';
import { Canada } from './entities/canada.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Canada]), FileUploadModule],
  controllers: [CanadaController],
  providers: [CanadaService],
})

export class CanadaModule {}
