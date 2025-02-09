import { PartialType } from '@nestjs/swagger';
import { CreateCoreFeatureDto } from './create-core-feature.dto';

export class UpdateCoreFeatureDto extends PartialType(CreateCoreFeatureDto) {}
