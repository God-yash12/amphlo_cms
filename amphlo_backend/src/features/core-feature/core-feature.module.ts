import { Module } from '@nestjs/common';
import { CoreFeatureService } from './core-feature.service';
import { CoreFeatureController } from './core-feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreFeature } from './entities/core-feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoreFeature])],
  controllers: [CoreFeatureController],
  providers: [CoreFeatureService],
})
export class CoreFeatureModule {}
