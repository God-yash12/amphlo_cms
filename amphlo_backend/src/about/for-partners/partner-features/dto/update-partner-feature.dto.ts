import { PartialType } from '@nestjs/swagger';
import { CreatePartnerFeatureDto } from './create-partner-feature.dto';

export class UpdatePartnerFeatureDto extends PartialType(CreatePartnerFeatureDto) {}
