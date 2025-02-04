import { PartialType } from '@nestjs/swagger';
import { CreateHomeTransformDto } from './create-home-transform.dto';

export class UpdateHomeTransformDto extends PartialType(CreateHomeTransformDto) {}
