import { PartialType } from '@nestjs/swagger';
import { CreateAboutMoreDto } from './create-about-more.dto';

export class UpdateAboutMoreDto extends PartialType(CreateAboutMoreDto) {}
