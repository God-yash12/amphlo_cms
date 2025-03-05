import { Module } from '@nestjs/common';
import { PartnerBenefitsService } from './partner-benefits.service';
import { PartnerBenefitsController } from './partner-benefits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerBenefit } from './entities/partner-benefit.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerBenefit, FileUpload])],
  controllers: [PartnerBenefitsController],
  providers: [PartnerBenefitsService],
})
export class PartnerBenefitsModule {}
