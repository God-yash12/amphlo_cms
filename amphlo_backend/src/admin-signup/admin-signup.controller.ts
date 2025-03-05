import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminSignupService } from './admin-signup.service';
import { CreateAdminSignupDto } from './dto/create-admin-signup.dto';
import { UpdateAdminSignupDto } from './dto/update-admin-signup.dto';
import { AdminSignup } from './entities/admin-signup.entity';

@Controller('admin-signup')
export class AdminSignupController {
  constructor(private readonly adminSignupService: AdminSignupService) {}

  @Post()
  create(@Body() createAdminSignupDto: CreateAdminSignupDto) {
    return this.adminSignupService.create(createAdminSignupDto);
  }

  @Get()
 async findAll() {
    const admins = this.adminSignupService.findAll();
    return admins;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const admin = await this.adminSignupService.findOne(id);
    const { password, ...info} = admin
    return info
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminSignupDto: UpdateAdminSignupDto) {
    return this.adminSignupService.update(+id, updateAdminSignupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminSignupService.remove(+id);
  }
}
