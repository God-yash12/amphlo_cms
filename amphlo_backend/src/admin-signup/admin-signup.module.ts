import { Module } from '@nestjs/common';
import { AdminSignupService } from './admin-signup.service';
import { AdminSignupController } from './admin-signup.controller';

@Module({
  controllers: [AdminSignupController],
  providers: [AdminSignupService],
})
export class AdminSignupModule {}
