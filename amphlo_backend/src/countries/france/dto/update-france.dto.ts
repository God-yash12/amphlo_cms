import { PartialType } from '@nestjs/swagger';
import { CreateFranceDto } from './create-france.dto';

export class UpdateFranceDto extends PartialType(CreateFranceDto) {}
