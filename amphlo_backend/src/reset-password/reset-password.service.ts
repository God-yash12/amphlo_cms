// reset-password.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminSignup } from 'src/admin-signup/entities/admin-signup.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mailer/mailer.service';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { AdminSignupService } from 'src/admin-signup/admin-signup.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(AdminSignup)
    private readonly adminRepository: Repository<AdminSignup>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly adminService: AdminSignupService,
  ) { }

  async generateOTP(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } })
    if (!admin) throw new NotFoundException("Admin with this email does not Found");

    const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const expireOTP = new Date();
    expireOTP.setMinutes(expireOTP.getMinutes() + 5);

    admin.otp = resetOTP;
    admin.otpExpire = expireOTP;
    await this.adminRepository.save(admin);

    await this.mailService.sendOTP(email, admin.otp);
    return { message: "OTP has been sent to your gmail" };
  }

  async verifyOTP(email:string,  otp: string) {
    const adminOTP = await this.adminRepository.findOne({ where: { email } })
    if (!adminOTP) throw new BadRequestException("Admin Not Found");

    const storedOTP = adminOTP.otp;
    const providedOTP = otp;
    if(storedOTP !== providedOTP) throw new BadRequestException("Invalid OTP")
    // Check if OTP has expired
    if (new Date() > new Date(adminOTP.otpExpire)) {
      throw new BadRequestException('OTP has expired! Please request a new one.');
    }

    // Clear OTP after successful verification
    adminOTP.otp = null;
    adminOTP.otpExpire = null;
    await this.adminRepository.save(adminOTP);

    return {
      message: "OTP verified successfully",
      // token // This will be used for password reset
    };
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      const admin = await this.adminRepository.findOne({where: {email}});

      if (!admin) throw new NotFoundException("Admin Not Found");

      const hashPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashPassword;
      await this.adminRepository.save(admin);

      return { message: "Password Reset successfully" };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException("Invalid or expired reset token");
    }
    throw error;
    }
  }
}
