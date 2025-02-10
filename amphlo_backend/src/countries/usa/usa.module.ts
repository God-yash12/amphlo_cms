import { Module } from '@nestjs/common';
import { UsaService } from './usa.service';
import { UsaController } from './usa.controller';
import { USA } from './entities/usa.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([USA]), FileUploadModule],
  controllers: [UsaController],
  providers: [UsaService],
})  

export class UsaModule {}
