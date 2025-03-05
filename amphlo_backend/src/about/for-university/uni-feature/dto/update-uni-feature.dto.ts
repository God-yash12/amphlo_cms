import { PartialType } from '@nestjs/swagger';
import { CreateUniFeatureDto } from './create-uni-feature.dto';

export class UpdateUniFeatureDto extends PartialType(CreateUniFeatureDto) {}
