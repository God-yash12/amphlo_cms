import { PartialType } from '@nestjs/swagger';
import { CreatePortalAccessDto } from './create-portal-access.dto';

export class UpdatePortalAccessDto extends PartialType(CreatePortalAccessDto) {}
