import { IsArray, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ButtonDto {
    @IsString()
    name: string;

    @IsString()
    route: string;
}

export class CreateHomeTransformDto {
    @IsString()
    @IsOptional()
    title: string;


    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    imageId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ButtonDto)
    buttons: ButtonDto[];
}
