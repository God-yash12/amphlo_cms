import { Module } from '@nestjs/common';
import { UniWhyamphloService } from './uni-whyamphlo.service';
import { UniWhyamphloController } from './uni-whyamphlo.controller';
import { UniWhyamphlo } from './entities/uni-whyamphlo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UniWhyamphlo])],
  controllers: [UniWhyamphloController],
  providers: [UniWhyamphloService],
})
export class UniWhyamphloModule {}
