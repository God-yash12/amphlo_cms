import { PartialType } from '@nestjs/swagger';
import { CreatePartnerHeroDto } from './create-partner-hero.dto';

export class UpdatePartnerHeroDto extends PartialType(CreatePartnerHeroDto) {}
