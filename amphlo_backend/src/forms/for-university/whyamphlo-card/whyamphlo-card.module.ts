import { Module } from '@nestjs/common';
import { WhyamphloCardService } from './whyamphlo-card.service';
import { WhyamphloCardController } from './whyamphlo-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhyamphloCard } from './entities/whyamphlo-card.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([WhyamphloCard]), FileUploadModule],
  controllers: [WhyamphloCardController],
  providers: [WhyamphloCardService],
})
export class WhyamphloCardModule {}
