import { Module } from '@nestjs/common';
import { JapanService } from './japan.service';
import { JapanController } from './japan.controller';
import { Japan } from './entities/japan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Japan]), FileUploadModule],
  controllers: [JapanController],
  providers: [JapanService],
})

export class JapanModule {}
