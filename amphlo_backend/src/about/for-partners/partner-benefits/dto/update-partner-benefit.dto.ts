import { PartialType } from '@nestjs/swagger';
import { CreatePartnerBenefitDto } from './create-partner-benefit.dto';

export class UpdatePartnerBenefitDto extends PartialType(CreatePartnerBenefitDto) {}
