import { Module } from '@nestjs/common';
import { PartnerJoinnowService } from './partner-joinnow.service';
import { PartnerJoinnowController } from './partner-joinnow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerJoinnow } from './entities/partner-joinnow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerJoinnow])],
  controllers: [PartnerJoinnowController],
  providers: [PartnerJoinnowService],
})
export class PartnerJoinnowModule {}
