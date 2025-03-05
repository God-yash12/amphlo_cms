import { Module } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { OverviewController } from './overview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Overview]), FileUploadModule],
  controllers: [OverviewController],
  providers: [OverviewService],
})
export class OverviewModule {}
