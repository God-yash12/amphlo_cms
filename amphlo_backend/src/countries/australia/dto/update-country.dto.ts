import { PartialType } from '@nestjs/swagger';
import { CreateAustraliaDto } from './create-country.dto';

export class UpdateAustraliaDto extends PartialType(CreateAustraliaDto) {}
