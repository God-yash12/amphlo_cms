import { PartialType } from '@nestjs/swagger';
import { CreateJoinNowDto } from './create-join-now.dto';

export class UpdateJoinNowDto extends PartialType(CreateJoinNowDto) {}
