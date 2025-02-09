import { Module } from '@nestjs/common';
import { PartnerFeaturesService } from './partner-features.service';
import { PartnerFeaturesController } from './partner-features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerFeature } from './entities/partner-feature.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerFeature]), FileUploadModule],
  controllers: [PartnerFeaturesController],
  providers: [PartnerFeaturesService],
})
export class PartnerFeaturesModule {}
