import { PartialType } from '@nestjs/swagger';
import { CreateCanadaDto } from './create-canada.dto';

export class UpdateCanadaDto extends PartialType(CreateCanadaDto) {}
