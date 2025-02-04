import { PartialType } from '@nestjs/swagger';
import { CreateWhyAmphloDto } from './create-why-amphlo.dto';

export class UpdateWhyAmphloDto extends PartialType(CreateWhyAmphloDto) {}
