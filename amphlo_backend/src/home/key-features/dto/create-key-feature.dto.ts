import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateKeyFeatureDto {
    @ApiProperty({
        description: 'The title of the key feature',
        example: 'Feature Title'
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'A detailed description of the key feature',
        example: 'This feature allows users to...'
    })
    @IsString()
    description: string;
}