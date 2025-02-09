import { PartialType } from '@nestjs/swagger';
import { CreatePartnerJoinnowDto } from './create-partner-joinnow.dto';

export class UpdatePartnerJoinnowDto extends PartialType(CreatePartnerJoinnowDto) {}
