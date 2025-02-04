import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class BannerButtonDto {
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

    @IsString()
    image: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ButtonDto)
    buttons: ButtonDto[];
}

class ButtonDto {
    @IsString()
    name: string;

    @IsString()
    route: string;
}
