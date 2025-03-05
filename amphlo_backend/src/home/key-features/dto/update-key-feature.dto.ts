import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateKeyFeatureDto {
    @ApiProperty({
        description: 'The title of the key feature',
        example: 'Updated Feature Title',
        required: false
    })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({
        description: 'A detailed description of the key feature',
        example: 'This feature has been updated to...',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;
}