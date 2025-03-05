import { Module } from '@nestjs/common';
import { UniFeatureService } from './uni-feature.service';
import { UniFeatureController } from './uni-feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniFeature } from './entities/uni-feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UniFeature])],
  controllers: [UniFeatureController],
  providers: [UniFeatureService],
})  

export class UniFeatureModule {}
