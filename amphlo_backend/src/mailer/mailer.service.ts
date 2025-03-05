
import * as nodemailer from "nodemailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SentMessageInfo, Options } from "nodemailer/lib/smtp-transport";
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class MailService{
  private transporter: nodemailer.Transporter<SentMessageInfo, Options>;

  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AMPHLO_GMAIL,
        pass: process.env.GMAIL_PASSWORD
      }
    }) 
  }

 
  async sendOTP(email: string, otp: string){
    const mailOptions = {
      from: process.env.AMPHLO_GMAIL,
      to: email,
      subject: "Reset Your Password",
      text: `Your OTP for password reset is: ${otp}. It will expire in 5 minutes.`,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      // console.log("OTP sent successfully", info.response);
    } catch (error) {
      console.error("Failed to send mail ", error)
    }
  }
}