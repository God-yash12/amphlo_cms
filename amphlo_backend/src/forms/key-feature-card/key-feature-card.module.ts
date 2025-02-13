import { Module } from '@nestjs/common';
import { KeyFeatureCardService } from './key-feature-card.service';
import { KeyFeatureCardController } from './key-feature-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyFeatureCard } from './entities/key-feature-card.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeyFeatureCard, FileUpload])],
  controllers: [KeyFeatureCardController],
  providers: [KeyFeatureCardService],
})
export class KeyFeatureCardModule {}
