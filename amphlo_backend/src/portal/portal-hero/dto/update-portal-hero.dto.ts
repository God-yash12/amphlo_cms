import { PartialType } from '@nestjs/swagger';
import { CreatePortalHeroDto } from './create-portal-hero.dto';

export class UpdatePortalHeroDto extends PartialType(CreatePortalHeroDto) {}
