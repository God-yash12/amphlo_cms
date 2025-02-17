import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {

constructor (private readonly configService: ConfigService) {}

async validateAdmin(username: string, password: string): Promise<boolean> {
  const adminUsername = this.configService.get('LOGIN_USERNAME');
  const adminPassword = this.configService.get('LOGIN_PASSWORD');
  return username === adminUsername && password === adminPassword;
}
   
}
