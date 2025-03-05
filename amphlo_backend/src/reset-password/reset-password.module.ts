import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSignup } from 'src/admin-signup/entities/admin-signup.entity';
import { MailService } from 'src/mailer/mailer.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminSignupService } from 'src/admin-signup/admin-signup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminSignup]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService, MailService, AdminSignupService],
  exports: [ResetPasswordService]
})
export class ResetPasswordModule { }
