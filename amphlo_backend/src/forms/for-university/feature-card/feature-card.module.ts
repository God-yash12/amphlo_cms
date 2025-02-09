import { Module } from '@nestjs/common';
import { FeatureCardService } from './feature-card.service';
import { FeatureCardController } from './feature-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureCard } from './entities/feature-card.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureCard]), FileUploadModule],
  controllers: [FeatureCardController],
  providers: [FeatureCardService],
})
export class FeatureCardModule {}
