import { Module } from '@nestjs/common';
import { WhyAmphloService } from './why-amphlo.service';
import { WhyAmphloController } from './why-amphlo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhyAmphlo } from './entities/why-amphlo.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([WhyAmphlo]), FileUploadModule],
  controllers: [WhyAmphloController],
  providers: [WhyAmphloService],
})
export class WhyAmphloModule {}
