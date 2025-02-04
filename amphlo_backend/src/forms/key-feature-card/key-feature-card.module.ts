import { Module } from '@nestjs/common';
import { KeyFeatureCardService } from './key-feature-card.service';
import { KeyFeatureCardController } from './key-feature-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyFeatureCard } from './entities/key-feature-card.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([KeyFeatureCard]), FileUploadModule],
  controllers: [KeyFeatureCardController],
  providers: [KeyFeatureCardService],
})
export class KeyFeatureCardModule {}
