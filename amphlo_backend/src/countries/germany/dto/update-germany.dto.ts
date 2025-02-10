import { PartialType } from '@nestjs/swagger';
import { CreateGermanyDto } from './create-germany.dto';

export class UpdateGermanyDto extends PartialType(CreateGermanyDto) {}
