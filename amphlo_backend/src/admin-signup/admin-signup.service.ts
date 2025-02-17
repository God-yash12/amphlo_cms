import { Injectable } from '@nestjs/common';
import { CreateAdminSignupDto } from './dto/create-admin-signup.dto';
import { UpdateAdminSignupDto } from './dto/update-admin-signup.dto';

@Injectable()
export class AdminSignupService {
  create(createAdminSignupDto: CreateAdminSignupDto) {
    return 'This action adds a new adminSignup';
  }

  findAll() {
    return `This action returns all adminSignup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminSignup`;
  }

  update(id: number, updateAdminSignupDto: UpdateAdminSignupDto) {
    return `This action updates a #${id} adminSignup`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminSignup`;
  }
}
