import { PartialType } from '@nestjs/swagger';
import { CreateAdminSignupDto } from './create-admin-signup.dto';

export class UpdateAdminSignupDto extends PartialType(CreateAdminSignupDto) {}
