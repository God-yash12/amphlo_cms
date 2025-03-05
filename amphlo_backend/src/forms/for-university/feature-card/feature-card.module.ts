import { Module } from '@nestjs/common';
import { FeatureCardService } from './feature-card.service';
import { FeatureCardController } from './feature-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureCard } from './entities/feature-card.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureCard, FileUpload])],
  controllers: [FeatureCardController],
  providers: [FeatureCardService],
})
export class FeatureCardModule {}
