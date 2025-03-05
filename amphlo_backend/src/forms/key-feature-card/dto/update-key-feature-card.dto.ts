import { PartialType } from '@nestjs/swagger';
import { CreateKeyFeatureCardDto } from './create-key-feature-card.dto';

export class UpdateKeyFeatureCardDto extends PartialType(CreateKeyFeatureCardDto) {}
