import { PartialType } from '@nestjs/swagger';
import { CreateUkDto } from './create-uk.dto';

export class UpdateUkDto extends PartialType(CreateUkDto) {}
