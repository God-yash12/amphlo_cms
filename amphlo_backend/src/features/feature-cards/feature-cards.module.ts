import { Module } from '@nestjs/common';
import { FeatureCardsService } from './feature-cards.service';
import { FeatureCardsController } from './feature-cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureCard } from './entities/feature-card.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureCard, FileUpload])],
  controllers: [FeatureCardsController],
  providers: [FeatureCardsService],
})
export class FeatureCardsModule {}
