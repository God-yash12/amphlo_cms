import { Module } from '@nestjs/common';
import { FeatureCardsService } from './feature-cards.service';
import { FeatureCardsController } from './feature-cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureCard } from './entities/feature-card.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureCard]), FileUploadModule],
  controllers: [FeatureCardsController],
  providers: [FeatureCardsService],
})
export class FeatureCardsModule {}
