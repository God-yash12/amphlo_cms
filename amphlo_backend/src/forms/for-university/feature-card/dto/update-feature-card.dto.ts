import { PartialType } from '@nestjs/swagger';
import { CreateFeatureCardDto } from './create-feature-card.dto';

export class UpdateFeatureCardDto extends PartialType(CreateFeatureCardDto) {}
