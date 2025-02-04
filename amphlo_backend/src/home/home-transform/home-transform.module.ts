import { Module } from '@nestjs/common';
import { HomeTransformService } from './home-transform.service';
import { HomeTransformController } from './home-transform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeTransform } from './entities/home-transform.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([HomeTransform]), FileUploadModule],
  controllers: [HomeTransformController],
  providers: [HomeTransformService],
})  

export class HomeTransformModule {}
