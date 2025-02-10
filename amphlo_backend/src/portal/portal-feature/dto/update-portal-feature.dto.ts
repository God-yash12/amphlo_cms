import { PartialType } from '@nestjs/swagger';
import { CreatePortalFeatureDto } from './create-portal-feature.dto';

export class UpdatePortalFeatureDto extends PartialType(CreatePortalFeatureDto) {}
