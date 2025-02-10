import { PartialType } from '@nestjs/swagger';
import { CreateJapanDto } from './create-japan.dto';

export class UpdateJapanDto extends PartialType(CreateJapanDto) {}
