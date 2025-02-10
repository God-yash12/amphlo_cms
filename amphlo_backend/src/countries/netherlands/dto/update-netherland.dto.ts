import { PartialType } from '@nestjs/swagger';
import { CreateNetherlandsDto } from './create-netherland.dto';


export class UpdateNetherlandsDto extends PartialType(CreateNetherlandsDto) {}
