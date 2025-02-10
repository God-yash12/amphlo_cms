import { Module } from '@nestjs/common';
import { UkService } from './uk.service';
import { UkController } from './uk.controller';
import { UK } from './entities/uk.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([UK]), FileUploadModule],
  controllers: [UkController],
  providers: [UkService],
})  

export class UkModule {}
