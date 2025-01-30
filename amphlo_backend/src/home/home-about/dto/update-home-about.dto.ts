import { PartialType } from '@nestjs/swagger';
import { CreateHomeAboutDto } from './create-home-about.dto';

export class UpdateHomeAboutDto extends PartialType(CreateHomeAboutDto) {}
