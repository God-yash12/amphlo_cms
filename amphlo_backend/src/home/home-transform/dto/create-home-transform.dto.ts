import { IsArray, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class ButtonDto {
    @ApiProperty({ description: 'The name of the button' })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ description: 'The route the button points to' })
    @IsString()
    @IsOptional()
    route: string;
}

export class CreateHomeTransformDto {
    @ApiProperty({ description: 'The title of the home transform', required: false })
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty({ description: 'A description of the home transform', required: false })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ description: 'The ID of the image associated with the home transform', required: false })
    @IsOptional()
    @IsNumber()
    imageId: number;

    @ApiProperty({ type: [ButtonDto], description: 'An array of buttons associated with the home transform' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ButtonDto)
    buttons: ButtonDto[];
}
