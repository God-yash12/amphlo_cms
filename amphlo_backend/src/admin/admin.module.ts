import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
