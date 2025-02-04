import { PartialType } from '@nestjs/swagger';
import { CreateKeyFeatureDto } from './create-key-feature.dto';

export class UpdateKeyFeatureDto extends PartialType(CreateKeyFeatureDto) {}
