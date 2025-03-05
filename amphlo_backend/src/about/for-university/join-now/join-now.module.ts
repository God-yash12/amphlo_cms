import { Module } from '@nestjs/common';
import { JoinNowService } from './join-now.service';
import { JoinNowController } from './join-now.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinNow } from './entities/join-now.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JoinNow])],
  controllers: [JoinNowController],
  providers: [JoinNowService],
})
export class JoinNowModule {}
