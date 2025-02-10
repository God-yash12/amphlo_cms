import { Module } from '@nestjs/common';
import { NetherlandsService } from './netherlands.service';
import { NetherlandsController } from './netherlands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Netherlands } from './entities/netherland.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Netherlands]), FileUploadModule],
  controllers: [NetherlandsController],
  providers: [NetherlandsService],
})  

export class NetherlandsModule {}
