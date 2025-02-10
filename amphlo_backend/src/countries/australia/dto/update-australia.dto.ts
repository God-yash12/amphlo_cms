import { PartialType } from '@nestjs/swagger';
import { CreateAustraliaDto } from './create-australia.dto';

export class UpdateAustraliaDto extends PartialType(CreateAustraliaDto) {}
