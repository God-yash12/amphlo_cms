import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ButtonDto {
    @IsString()
    name: string;

    @IsString()
    route: string;
}

export class CreateBannerDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    imageId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ButtonDto)
    buttons: ButtonDto[];
}

