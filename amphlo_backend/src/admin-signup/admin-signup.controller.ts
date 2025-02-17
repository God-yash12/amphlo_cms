import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminSignupService } from './admin-signup.service';
import { CreateAdminSignupDto } from './dto/create-admin-signup.dto';
import { UpdateAdminSignupDto } from './dto/update-admin-signup.dto';

@Controller('admin-signup')
export class AdminSignupController {
  constructor(private readonly adminSignupService: AdminSignupService) {}

  @Post()
  create(@Body() createAdminSignupDto: CreateAdminSignupDto) {
    return this.adminSignupService.create(createAdminSignupDto);
  }

  @Get()
  findAll() {
    return this.adminSignupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminSignupService.findOne(+id);
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
