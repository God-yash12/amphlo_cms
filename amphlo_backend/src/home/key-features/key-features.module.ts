import { Module } from '@nestjs/common';
import { KeyFeaturesService } from './key-features.service';
import { KeyFeaturesController } from './key-features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyFeature } from './entities/key-feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeyFeature])],
  controllers: [KeyFeaturesController],
  providers: [KeyFeaturesService],
})
export class KeyFeaturesModule {}
