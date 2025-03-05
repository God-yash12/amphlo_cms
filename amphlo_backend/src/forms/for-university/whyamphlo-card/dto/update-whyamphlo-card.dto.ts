import { PartialType } from '@nestjs/swagger';
import { CreateWhyamphloCardDto } from './create-whyamphlo-card.dto';

export class UpdateWhyamphloCardDto extends PartialType(CreateWhyamphloCardDto) {}
