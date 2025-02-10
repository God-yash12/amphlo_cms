import { PartialType } from '@nestjs/swagger';
import { CreateUsaDto } from './create-usa.dto';

export class UpdateUsaDto extends PartialType(CreateUsaDto) {}
