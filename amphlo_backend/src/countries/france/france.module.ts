import { Module } from '@nestjs/common';
import { FranceService } from './france.service';
import { FranceController } from './france.controller';
import { France } from './entities/france.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([France]), FileUploadModule],
  controllers: [FranceController],
  providers: [FranceService],
})  

export class FranceModule {}
