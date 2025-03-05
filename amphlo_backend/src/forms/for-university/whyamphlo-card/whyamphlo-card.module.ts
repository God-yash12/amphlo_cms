import { Module } from '@nestjs/common';
import { WhyamphloCardService } from './whyamphlo-card.service';
import { WhyamphloCardController } from './whyamphlo-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhyamphloCard } from './entities/whyamphlo-card.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhyamphloCard, FileUpload])],
  controllers: [WhyamphloCardController],
  providers: [WhyamphloCardService],
})
export class WhyamphloCardModule {}
