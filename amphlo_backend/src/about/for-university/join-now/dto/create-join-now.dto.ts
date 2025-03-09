import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from "class-validator";

export class HeroButtonDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    route: string;
}


export class CreateJoinNowDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => HeroButtonDto)
    buttons?: HeroButtonDto[];
}
