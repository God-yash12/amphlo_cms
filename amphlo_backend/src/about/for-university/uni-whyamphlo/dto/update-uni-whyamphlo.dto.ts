import { PartialType } from '@nestjs/swagger';
import { CreateUniWhyamphloDto } from './create-uni-whyamphlo.dto';

export class UpdateUniWhyamphloDto extends PartialType(CreateUniWhyamphloDto) {}
