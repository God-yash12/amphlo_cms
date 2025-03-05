import { Module } from '@nestjs/common';
import { AdminSignupService } from './admin-signup.service';
import { AdminSignupController } from './admin-signup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSignup } from './entities/admin-signup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSignup])],
  controllers: [AdminSignupController],
  providers: [AdminSignupService],
  exports: [AdminSignupService],
})
export class AdminSignupModule {}
